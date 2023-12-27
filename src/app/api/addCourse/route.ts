import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { ZodError } from "zod";
import { ContentData, CourseData } from "@/app/types";

import { createCourse } from "@/app/_controllers/CourseController"; // Adjust the import path as needed
import { addContent, addContentWithoutResponse, addDefaultCourseImageContent, getDefaultImageCourseContent } from "@/app/_controllers/ContentController";
import { error } from "console";
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
    let file=undefined;
    const comments = data.get("comments") as string;
    let course_image:ContentData|undefined;
     file = data.get("file") as unknown as File;
     console.log(file)
    course_image=await addContentWithoutResponse({ file, comments, subjectId:"" });
  //   }
  //   else{
  //     let contentDefaultImage =await getDefaultImageCourseContent();
  //     if (!contentDefaultImage) {
  //       course_image= await addDefaultCourseImageContent();
  //     }
  // }
    if(course_image)
    return createCourse({
      name: course.name,
      img_id: course_image,
      creationTimestamp: course.creationTimestamp,
      userId
    });
    else {
      throw new Error("dont have picture course");
    }
  } catch (error) {
    return handleError(error);
  }
}