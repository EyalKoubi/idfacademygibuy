
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError } from "@/utils/validation";



interface SubjectRequest extends NextRequest {
    name?: string;
  }
  
  export async function POST(req: SubjectRequest, res: NextApiResponse) {
    const data = await req.formData();
    const updatedProgress=data.get("updatedProgress");
    // const result = await db
    //     .update("UserCourseProgress") // Assuming 'db' is your database access object
    //         .set({
    //     lastChapterId: updatedProgress.lastChapterId,
    //     lastSubjectId: updatedProgress.lastSubjectId,
    //     firstUnwatchedContentId: updatedProgress.firstUnwatchedContentId,
    //     contentProgress: JSON.stringify(updatedProgress.contentProgress),
    //     })
    //     .where("userId", "=", userId)
    //     .andWhere("courseId", "=", courseId)
        // .executeTakeFirstOrThrow();
    }     
