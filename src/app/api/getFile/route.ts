import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { s3Client ,bucket} from "@/app/_minio/minio";


interface FileRequest extends NextRequest {
    fileName?: string;
  }
export async function GET(req: FileRequest, res: NextApiResponse) {

    const data = await req.formData();
    const fileName = data.get("fileName") as unknown as string;

    const response=s3Client.getObject(bucket, fileName, (err, dataStream) => {
        if (err) {
            console.error("Error getting file:", err);
            return res.status(500).send("Error getting the file.");
        }
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        dataStream.pipe(res);
        NextResponse.json(response);
    });
}
