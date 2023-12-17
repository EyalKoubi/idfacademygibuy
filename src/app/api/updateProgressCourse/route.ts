
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError } from "@/utils/validation";
import { ContentProgress, UserCourseProgress } from "@/app/types";
import { updateUserCourseProgress } from "@/app/_controllers/CourseUserController";



interface UpdateProcessRequest extends NextRequest {
    userId?: string;
    courseId?: string;
    lastChapterId?:string;
    lastSubjectId?:string;
    firstUnwatchedContentId?:string;
    contentProgress?:string;
  }
  
  export async function POST(req: UpdateProcessRequest, res: NextApiResponse) {
    const data = await req.formData();
  
    const userId = data.get("userId") as string;
    const courseId = data.get("courseId") as string;
    const lastChapterId = data.get("lastChapterId") as string;
    const lastSubjectId = data.get("lastSubjectId") as string;
    const firstUnwatchedContentId = data.get("firstUnwatchedContentId") as string;
    const contentProgress = data.get("contentProgress") as string;
  
    return await updateUserCourseProgress(
      {
        userId,
        courseId,
        lastChapterId,
        lastSubjectId,
        firstUnwatchedContentId,
        contentProgress,
      }
    );
  }