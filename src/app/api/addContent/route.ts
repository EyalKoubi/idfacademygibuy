import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import multer from "multer";
import { NextApiResponse } from "next";
import { db } from "../../../db/database";

interface MulterRequest extends NextRequest {
  files?: Express.Multer.File[];
}

const s3Config = {
  endPoint: "127.0.0.1",
  port: 9000,
  accessKey: "AKIAIOSFODNN7EXAMPLE",
  secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  useSSL: false,
};

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
const s3Client = new Minio.Client(s3Config);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: MulterRequest, res: NextApiResponse) {
  try {
    const data = await req.formData();
    const file = data.get("file") as unknown as File;
    const comments = data.get("comments") as string;
    const subjectId = data.get("subjectId") as string;
    console.log("🚀 ~ file: route.ts:45 ~ POST ~ subjectId:", subjectId);

    const newContent = await db
      .insertInto("Content")
      .values({
        file_name: file.name,
        comments: comments,
      })
      .returning(["id", "file_name", "comments"])
      .executeTakeFirstOrThrow();

    console.log(
      "🚀 ~ file: route.ts:57 ~ POST ~ newContent.id:",
      newContent.id
    );
    await db
      .insertInto("ContentSubject")
      .values({
        contentId: newContent.id,
        subjectId: subjectId,
      })
      .execute();
    const bucket = newContent.id;
    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await ensureBucketExists(bucket);
    console.log("Files are being processed");
    console.log(buffer);
    console.log(file.name);

    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    upload.array("files")(req as any, res as any, async (err: any) => {
      if (err) {
        console.error("Error uploading files:", err);
      }
      if (file) {
        await uploadFileToS3Service(file, buffer, bucket);
        console.log("Files are being processed");
      } else {
        console.log("File or file buffer is missing.");
      }
      return NextResponse.json(newContent);
    });
    return NextResponse.json(newContent);
  } catch (error) {
    console.error("Error in file upload handler:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

async function uploadFileToS3Service(
  file: File | null,
  buffer: Buffer,
  bucket: string
) {
  const objectName: any = file?.name;
  const objectSize = file?.size;

  await new Promise((resolve, reject) => {
    s3Client.putObject(
      bucket,
      objectName,
      buffer,
      objectSize,
      (err: any, etag: unknown) => {
        if (err) {
          console.error("Error uploading to Minio:", err);
          reject(err);
        } else {
          resolve(etag);
        }
      }
    );
  });
}
