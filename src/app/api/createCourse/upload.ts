import express, { Request, Response } from "express";
import * as Minio from "minio";
import multer from "multer";

// Define a custom type for the 'file' object
type MyFile = Express.Multer.File;

const app = express();
const upload = multer();

const bucket = "bucket1"; // Specify the name of your MinIO bucket

const s3Client = new Minio.Client({
  endPoint: "127.0.0.1", // Use the address of your MinIO server
  port: 9000, // Use the port of your MinIO server
  accessKey: "AKIAIOSFODNN7EXAMPLE", // Replace with your MinIO root user access key
  secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY", // Replace with your MinIO root user secret key
  useSSL: false, // Set to true if your MinIO server uses HTTPS
});

app.use(express.static(process.cwd() + "/public"));

app.post("/upload", upload.array("files"), (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(`Uploaded ${files.length} files:`);

  // Keep track of the number of successful uploads
  let successfulUploads = 0;

  files.forEach((file, index) => {
    console.log(`File ${index + 1}:`);
    console.log("File Buffer: ", file.buffer);
    console.log("File Name: ", file.originalname);

    const objectName = `bucket1/${file.originalname}`;

    const metaData: Minio.ItemBucketMetadata = {
      "Content-Type": file.mimetype, // Set the Content-Type metadata
    };

    s3Client.putObject(
      bucket,
      objectName,
      file.buffer as Buffer,
      file.size,
      metaData,
      (err, etag) => {
        if (err) {
          console.error(`Error uploading File ${index + 1}:`, err);
        } else {
          console.log(`File ${index + 1} uploaded successfully.`);
          successfulUploads++;
        }

        // Check if all files have been uploaded successfully
        if (successfulUploads === files.length) {
          res.status(200).send("All files uploaded successfully");
        }
      }
    );
  });
});
