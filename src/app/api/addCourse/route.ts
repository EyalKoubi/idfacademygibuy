import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { ZodError } from "zod";
import { ContentData, CourseData } from "@/app/types";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  try {
  const data = await req.formData();
  const course = JSON.parse(data.get("course") as string);
  const userId=data.get("userId") as string;
  const courseToDb={
    name: course.name,
    img_id: course.img_id.id,
    creationTimestamp:course.creationTimestamp
  }
  console.log("course that in the server",course)
  const image_content:ContentData=course.img_id
 
  console.log(courseToDb)
  CourseSchema.parse(courseToDb);
  console.log("🚀 ~ file: route.ts:12 ~ course ~ course:", course);
 // console.log("🚀 ~ file: route.ts:12 ~ POST ~ name:", name);
  console.log("🚀 ~ file: route.ts:11 ~ POST ~ data:", data);
  // console.log("🚀 ~ file: route.ts:7 ~ POST ~ name:", name);
  //const currentDate = new Date();
  const newCourse = await db
      .insertInto("Course")
      .values(courseToDb)
      .returning(["id", "name","img_id","creationTimestamp"])
      .executeTakeFirstOrThrow();

  const newUserCourse = await db
      .insertInto("UserCourses")
      .values({courseId:newCourse.id,userId:userId ,role:1})
      .returning(["courseId","UserCourses.userId","UserCourses.role"])
      .executeTakeFirstOrThrow();    
  const courseToClient:CourseData={   
      id:newCourse.id,
      name:newCourse.name,
      img_id:image_content,
      creationTimestamp:newCourse.creationTimestamp,
      chapters:[]
    }
    return NextResponse.json(courseToClient);
  } catch (error) {
    return handleError(error) 
}
}
