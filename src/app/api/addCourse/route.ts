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
  if (!data.get("course"))
    return NextResponse.json({ message: "There is no course input!" });
    const course = JSON.parse(data.get("course") as string);
    
  CourseSchema.parse(course); // This will throw if validation fails

  console.log("🚀 ~ file: route.ts:12 ~ course ~ course:", course);
  const name: string = course.name;
  console.log("🚀 ~ file: route.ts:12 ~ POST ~ name:", name);
  console.log("🚀 ~ file: route.ts:11 ~ POST ~ data:", data);
  // console.log("🚀 ~ file: route.ts:7 ~ POST ~ name:", name);

  
    const newCourse = await db
      .insertInto("Course")
      .values({
        name,
      })
      .returning(["id", "name"])
      .executeTakeFirstOrThrow();
    return NextResponse.json(newCourse);
  } catch (error) {
    return handleError(error) 
}
}
