import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import multer from "multer";
import { NextApiResponse } from "next";
import { db } from "@/db/database";
import { addContent } from "@/app/_controllers/ContentController"; 
import {s3Config,s3Client,uploadFileToS3Service,bucket} from "@/app/_minio/minio"
import { ContentSchema, handleError } from "@/utils/validation";
interface MulterRequest extends NextRequest {
  files?: Express.Multer.File[];
}
export async function POST(req:MulterRequest, res: NextApiResponse) {
  const data = await req.formData();
  const file = data.get("file") as unknown as File;
  const comments = data.get("comments") as string;
  const subjectId = data.get("subjectId") as string;

  return addContent({ file, comments, subjectId });
}


