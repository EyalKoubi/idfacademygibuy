import { NextRequest, NextResponse } from "next/server";
import { Express, Response } from "express";
import * as Minio from "minio";

// Replace these values with your actual S3 configuration
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

export const POST = async (request: NextRequest, response: Response) => {
  console.log("reach t------------o posts");
  // Use custom type definition to access 'files' property
  const customReq = request as NextRequest & { files: Express.Multer.File[] };

  const files = await customReq.files;

  //   if (!files || files.length === 0) {
  //     return response.send("No files were uploaded.");
  //   }

  console.log(`Uploaded ${files?.length} files:`);

  // Loop through the uploaded files
  files?.forEach((file, index) => {
    console.log(`File ${index + 1}:`);
    console.log("File Buffer: ", file.buffer);
    console.log("File Name: ", file.originalname);

    const objectName = `bucket1/${file.originalname}`;

    s3Client.putObject(
      bucket,
      objectName,
      file.buffer,
      file.size,
      (err, etag) => {
        if (err) {
          console.error(`Error uploading File ${index + 1}:`, err);
        } else {
          console.log(`File ${index + 1} uploaded successfully.`);
        }
        response.status(200).send("asdasdasd");
        // If all files have been processed, send a response
        // if (index === files.length - 1) {
        //   response.status(200).send("Files uploaded successfully");
        // }
      }
    );
  });
};
