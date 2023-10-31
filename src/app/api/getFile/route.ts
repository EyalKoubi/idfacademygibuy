import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { s3Client ,bucket, getFileFromS3Service} from "@/app/_minio/minio";


interface FileRequest extends NextRequest {
    fileName?: string;
  }

  export async function GET(req: FileRequest, res: NextApiResponse) {
    const fileName = "87237182-74ca-4ab9-970d-9df118ea798d"; // Your static file name
    console.log(fileName);
        s3Client.getObject(bucket, fileName, (err, dataStream) => {
            if (err) {
                console.error("Error getting file:", err);
                NextResponse.json({ message: "Error getting the file" });
                return;
            }

            // Set headers for file download
            // res.setHeader("Content-Type", "application/octet-stream");
            // res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

            // Pipe the data stream to the response
            dataStream.pipe(res);
        });
        const buffer=await getFileFromS3Service(bucket,fileName)
        console.log(buffer)
        return  NextResponse.json({ data:buffer})
    // } catch (error) {
    //     console.error('Error in API route:', error);
    //     NextResponse.json({ message: "Internal server error" });
    // }
}

  
  
  
  
  