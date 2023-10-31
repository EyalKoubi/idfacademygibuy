import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import {s3Config,s3Client,bucket} from "../../_minio/minio"
interface ContentRequest extends NextRequest {
  contentId?: string;
}

export async function POST(req: ContentRequest, res: NextApiResponse) {
  //need to fix its not delete the content
  const data = await req.formData();
  if (!data.get("contentId"))
    return NextResponse.json({ message: "There is no content data!" });
  const contentId = data.get("contentId") as string;

  try {
    await db
      .deleteFrom("Content")
      .where("Content.id", "=", contentId)
      .executeTakeFirst();
   
    await deleteContentFromMinio(bucket);
    return NextResponse.json({ message: "content deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error delete content" });
  }
}
async function deleteContentFromMinio(bucket: string) {
  return new Promise((resolve, reject) => {
      const objectList = s3Client.listObjects(bucket, '', true);

      const objectsToDelete: string[] = [];

      objectList.on('data', (obj) => {
          if (obj && obj.name) {
              objectsToDelete.push(obj.name);
          }
      });

      objectList.on('end', () => {
          Promise.all(objectsToDelete.map(objectName => 
              new Promise((res, rej) => {
                  s3Client.removeObject(bucket, objectName, (err) => {
                      if (err) {
                          console.error("Error deleting object:", err);
                          rej(err);
                      } else {
                          res(true);
                      }
                  });
              })
          ))
          .then(() => resolve(true))
          .catch(reject);
      });

      objectList.on('error', (err) => {
          console.error("Error listing objects for deletion:", err);
          reject(err);
      });
  });
}

