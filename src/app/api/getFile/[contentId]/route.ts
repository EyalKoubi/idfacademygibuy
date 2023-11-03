import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { s3Client ,bucket, getFileFromS3Service, getFileChunkedBase64, getPresignedUrlFromS3Service} from "@/app/_minio/minio";


interface FileRequest extends NextRequest {
    fileName?: string;
  }
interface getFileProps{
    params:{
        contentId:string
    }
} 
function convertToBase64(data: Buffer) {
    if (data instanceof Buffer) {
        return data.toString('base64');
    } else {
        console.error("Provided data is not a Buffer");
        // Handle the error or convert `data` to a Buffer, depending on your scenario
    }
}
// export async function GET(req:FileRequest,context:getFileProps) {
//     const { contentId } = context.params;

//     try {
//         // Retrieve the base64 encoded file data
//         const fileData = await getFileChunkedBase64(bucket, contentId);

//         // Convert the base64 string to a buffer
//         const fileBuffer = Buffer.from(fileData, 'base64');

//         // Create a new headers object
//         const newHeaders = new Headers();
//         newHeaders.set("Content-Type", "application/octet-stream");
//         newHeaders.set("Content-Disposition", `attachment; filename="${contentId}"`);

//         // Encode the buffer as a base64 string and return it in the response
//         return new Response(fileBuffer, {
//             headers: newHeaders,
//             status: 200
//         });
//     } catch (err) {
//         console.error("Error getting file:", err);
//         return new Response(JSON.stringify({ message: "Error getting the file" }), { status: 500 });
//     }
// }
  
export async function GET(req: FileRequest, context: getFileProps) {
    const { contentId } = context.params;

    try {
        const presignedUrl = await getPresignedUrlFromS3Service(bucket, contentId);

        // Redirect the client to the presigned URL or send the URL in the response
        return NextResponse.redirect(presignedUrl);

    } catch (err) {
        console.error("Error generating pre-signed URL:", err);
        return new Response(JSON.stringify({ message: "Error getting the file" }), { status: 500 });
    }
}
