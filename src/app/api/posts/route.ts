import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import multer from "multer";
// import express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "minio";

// const app = express();

// Define an interface for the Multer request object
interface MulterRequest extends NextRequest {
  file?: Express.Multer.File;
}

// Create a Multer middleware instance
const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 500000,
  },
});

// Configure Minio settings (replace with your own)
const s3Config = {
  endPoint: "127.0.0.1",
  port: 9000, // Add the port if your Minio server is running on a non-default port
  accessKey: "AKIAIOSFODNN7EXAMPLE",
  secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  useSSL: false, // Set to true if your S3 endpoint uses SSL
};

// Replace 'bucket1' with your actual S3 bucket name
const bucket = "bucket1";

// Create a Minio client instance
const s3Client = new Minio.Client(s3Config);

const s3 = new Client({
  endPoint: "127.0.0.1",
  accessKey: "AKIAIOSFODNN7EXAMPLE",
  secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
});

// Define a route handler for POST requests
export async function POST(req: MulterRequest, res: NextApiResponse) {
  console.log(req);
  try {
    upload.single("file")(req as any, res as any, (err: any) => {
      if (err) {
        console.error("Error uploading file:", err);
        return NextResponse.json({ error: "Internal Server Error" });
      }

      // Check if Multer middleware has populated req.file
      if (req.file) {
        console.log(req.file);

        const { file } = req;
        console.log("🚀 ~ file: route.ts:37 ~ POST ~ req.file:", req.file);
        console.log("have req.file :) ");
        uploadFileToS3Service(file, res);
        return NextResponse.json({ message: "eize mashehu" });

        // Generate the object name based on the original file name
        // const objectName = `bucket1/${req.file.originalname}`;

        // console.log("🚀 ~ file: route.ts:37 ~ POST ~ objectName:", objectName);
        // // Proceed with file processing
        // const buffer = req.file.buffer as Buffer; // Explicitly cast to Buffer
        // console.log("🚀 ~ file: route.ts:39 ~ POST ~ buffer:", buffer);
        // s3Client.putObject(bucket, objectName, buffer, (err, etag) => {
        //   if (err) {
        //     console.error("Error uploading to Minio:", err);
        //     return NextResponse.json({ error: "Internal Server Error" });
        //   } else {
        //     console.log("File uploaded successfully");
        //     // If the file is uploaded successfully, send a response
        //     return NextResponse.json({ message: "File uploaded successfully" });
        //   }
        // });
      } else {
        console.log("I do not have file!");

        // Handle the case where 'req.file' is undefined
        return NextResponse.json({ error: "File or file buffer is missing." });
      }
    });
  } catch (error) {
    console.error("Error in file upload handler:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

async function uploadFileToS3Service(
  file: Express.Multer.File,
  res: NextApiResponse
) {
  const filename = "micha";

  await s3.putObject("bucket1", filename, file.buffer, (err: any) => {
    if (err) return NextResponse.json({ error: true, Message: err });
  });
}
