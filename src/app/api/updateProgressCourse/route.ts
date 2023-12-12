
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError } from "@/utils/validation";
import { ContentProgress, UserCourseProgress } from "@/app/types";



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
    console.log(userId,courseId,lastChapterId,lastSubjectId,firstUnwatchedContentId,contentProgress)
    try {
        const result = await db
            .updateTable("UserCourseProgress") 
            .set({
                lastChapterId: lastChapterId,
                lastSubjectId: lastSubjectId,
                firstUnwatchedContentId: firstUnwatchedContentId,
                contentProgress:contentProgress,
            })
            .where("userId", "=", userId)
            .where("courseId", "=", courseId)
            .executeTakeFirstOrThrow();
            const serializedResult = JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
    console.log(serializedResult);

        console.log(result)
        return NextResponse.json(serializedResult);
          }
       catch (error) {
        handleError(error)
       }
    }     
