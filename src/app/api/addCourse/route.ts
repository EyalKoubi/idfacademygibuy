import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { ZodError } from "zod";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  try {
  const data = await req.formData();
  const course = JSON.parse(data.get("course") as string);
 // const fileData =data.get("fileData") as unknown as File;
  console.log("course that in the server",course)
  course.img_id=course.img_id.id;
  //course.img_id={contentId:course.img_id.id, comments:course.img_id.comments}
  console.log(course)
  CourseSchema.parse(course); // This will throw if validation fails

  console.log("🚀 ~ file: route.ts:12 ~ course ~ course:", course);
 // console.log("🚀 ~ file: route.ts:12 ~ POST ~ name:", name);
  console.log("🚀 ~ file: route.ts:11 ~ POST ~ data:", data);
  // console.log("🚀 ~ file: route.ts:7 ~ POST ~ name:", name);
  //const currentDate = new Date();



    const newCourse = await db
      .insertInto("Course")
      .values({
        name: course.name,
        img_id: course.img_id,
        creationTimestamp:course.creationTimestamp
      })
      .returning(["id", "name","img_id","creationTimestamp"])
      .executeTakeFirstOrThrow();
    console.log(newCourse)
    //const contentCourse=await db.
    return NextResponse.json(newCourse);
  } catch (error) {
    return handleError(error) 
}
}
