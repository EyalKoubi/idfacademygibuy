import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import multer from "multer";
import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import {s3Config,s3Client,uploadFileToS3Service,bucket} from "../../_minio/minio"
import { ContentSchema, handleError } from "@/utils/validation";
interface MulterRequest extends NextRequest {
  files?: Express.Multer.File[];
}


async function ensureBucketExists(bucket: string) {
  try {
    const exists = await s3Client.bucketExists(bucket);
    if (!exists) {
      await s3Client.makeBucket(bucket, "us-east-1");
      console.log(`Bucket ${bucket} created successfully.`);
    }
  } catch (error) {
    console.error("Error ensuring bucket exists:", error);
    throw error;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
// const bucket = "idfacademy";// need to change 
export async function POST(req: MulterRequest, res: NextApiResponse) {
  try {
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const comments = data.get("comments") as string;
    const subjectId = data.get("subjectId") as string;
    console.log("🚀 ~ file: route.ts:45 ~ POST ~ subjectId:", subjectId);
    console.log(file.size)
    const contentData = {
      file_size: file.size, // Get the file size from the 'file' object
      comments: comments,
    };
    ContentSchema.parse(contentData)
    const newContent = await db
      .insertInto("Content")
      .values({
        file_name: file.name,
        comments: comments,
      })
      .returning(["id", "file_name", "comments"])
      .executeTakeFirstOrThrow();
    await db
      .insertInto("ContentSubject")
      .values({
        contentId: newContent.id,
        subjectId: subjectId,
      })
      .execute();
    if (!file) {
      return NextResponse.json({ success: false });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await ensureBucketExists(bucket);
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    upload.array("files")(req as any, res as any, async (err: any) => {
      if (err) {
        console.error("Error uploading files:", err);
      }
      if (file) {
        await uploadFileToS3Service(file, buffer, bucket,newContent.id);
        console.log("Files are being processed");
      } else {
        console.log("File or file buffer is missing.");
      }
      return NextResponse.json(newContent);
    });
    return NextResponse.json(newContent);
  } catch (error) {
    console.log(error)
     return handleError(error)
  }
}


