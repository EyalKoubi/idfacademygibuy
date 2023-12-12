import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
let insertIntoUserCourses
  const data = await req.formData();
  const courseId:string = data.get("courseId") as string;
  console.log("courseId",courseId)
  const userId:string = data.get("userId") as string;
  console.log("userId",userId)
  const answerType:string=data.get("answerType") as string
  console.log("answerType",answerType)
  try {
    const deleteFromUserRequestCourse = await db
    .deleteFrom("UserRequestsCourse")
    .where("UserRequestsCourse.courseId", '=', courseId)
    .where("UserRequestsCourse.userId", '=', userId)
    .executeTakeFirstOrThrow();
    console.log(answerType)
    if(answerType==="Accept"){

          const roleType=4;
           insertIntoUserCourses = await db
                .insertInto("UserCourses")
                .values({
                    courseId: courseId,
                    userId: userId,
                    role: roleType //can be user to present course
                })
                .returning(["userId", "courseId","role"])
            .executeTakeFirstOrThrow();
            const insertIntoUserProgressCourses = await db
            .insertInto("UserCourseProgress")
            .values({       
                userId:userId,//need to fix 
                courseId:courseId,
                lastChapterId:null ,
                lastSubjectId: null,
                firstUnwatchedContentId: null,
                contentProgress: JSON.stringify({}),
               
            })

          .executeTakeFirstOrThrow();
          console.log(insertIntoUserProgressCourses)
          return NextResponse.json(insertIntoUserCourses);
    }
    return NextResponse.json(null);
  } catch (error) {
    return handleError(error)
  }
}
