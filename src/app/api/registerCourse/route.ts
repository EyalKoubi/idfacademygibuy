import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  
  const courseId:string = data.get("courseId") as string;
  const userId:string = data.get("userId") as string;


  try {

    const insertUserCourse = await db
      .insertInto("UserCourses")
      .values({
        courseId:courseId,
        userId:userId,
        role:4// user role
      })
      .returning(["userId","courseId"])
      .executeTakeFirstOrThrow();


    return NextResponse.json(insertUserCourse);
  } catch (error) {
    return handleError(error)
  }
}