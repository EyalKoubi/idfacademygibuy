import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { s3Client ,bucket, getFileFromS3Service} from "@/app/_minio/minio";


interface FileRequest extends NextRequest {
    fileName?: string;
  }
  function convertToBase64(data: Buffer) {
    if (data instanceof Buffer) {
        return data.toString('base64');
    } else {
        console.error("Provided data is not a Buffer");
        // Handle the error or convert `data` to a Buffer, depending on your scenario
    }
}
export async function GET(req: FileRequest,context:{params:{contentId:string}}) {
    console.log("reach to get file")
    const fileName = context.params.contentId; // Your static file name
    console.log(fileName);
       
    try {
        // This should return the base64 encoded data
        const base64Data = await getFileFromS3Service(bucket, fileName);

        // Create a new headers object
        const newHeaders = new Headers();
        newHeaders.set("Content-Type", "application/octet-stream");
        newHeaders.set("Content-Disposition", `attachment; filename="${fileName}"`);

        // Return a NextResponse with base64 encoded data
        return NextResponse.json({ file: base64Data }, {
            headers: newHeaders,
        });
    } catch (err) {
        console.error("Error getting file:", err);
        return NextResponse.json({ message: "Error getting the file" }, { status: 500 });
    }
}

  
  
  
  
  