import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { ZodError } from "zod";
import { ContentData, CourseData } from "@/app/types";

import { createCourse } from "@/app/_controllers/CourseController"; // Adjust the import path as needed
import { addContent, addContentWithoutResponse } from "@/app/_controllers/ContentController";
interface CourseRequest extends NextRequest {
 course?: CourseData;
 userId?:string;
 file ?:File;
 comments?:string
}

export async function POST(req:CourseRequest, res: NextApiResponse) {
  try {
    const data = await req.formData();
    const course = JSON.parse(data.get("course") as string);
    const userId = data.get("userId") as string;
    const file = data.get("file") as unknown as File;
    const comments = data.get("comments") as string;
    const course_image:ContentData|undefined=await addContentWithoutResponse({ file, comments, subjectId:"" });
    if(course_image)
    return createCourse({
      name: course.name,
      img_id: course_image,
      creationTimestamp: course.creationTimestamp,
      userId
    });
    else{
    }
  } catch (error) {
    return handleError(error);
  }
}