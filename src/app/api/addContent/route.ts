import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import { NextApiResponse } from "next";
import { db } from "@/db/database";
import {  addContentWithResponse, addTextContent } from "@/app/_controllers/ContentController"; 
import {s3Config,s3Client,uploadFileToS3Service,bucket} from "@/app/_minio/minio"
import { ContentSchema, handleError } from "@/utils/validation";
interface MulterRequest extends NextRequest {
  files?: Express.Multer.File[];
}
export async function POST(req:MulterRequest, res: NextApiResponse) {
  const data = await req.formData();
  let file;
  const comments = data.get("comments") as string;
  const subjectId = data.get("subjectId") as string;
  if(data.get("file")){
    const file = data.get("file") as unknown as File;
    return addContentWithResponse({ file, comments, subjectId });
  }
  else {
    return addTextContent(comments,subjectId)
  }
}


