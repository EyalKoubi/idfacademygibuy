// CourseUserRequestController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database"; 
import { handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";

interface CourseUserRequestData {
  course: CourseData;
  userId: string;
  answerType: string;
}

export async function processCourseUserRequest(requestData: CourseUserRequestData) {
  const { course, userId, answerType } = requestData;
  try {
    // Delete from UserRequestsCourse
    await db
      .deleteFrom("UserRequestsCourse")
      .where("UserRequestsCourse.courseId", '=', course.id)
      .where("UserRequestsCourse.userId", '=', userId)
      .executeTakeFirstOrThrow();

    if (answerType === "Accept") {
      const roleType = 4; // Assuming 4 is the role for a user present in the course
      const insertIntoUserCourses = await db
        .insertInto("UserCourses")
        .values({ courseId: course.id, userId, role: roleType })
        .returning(["userId", "courseId", "role"])
        .executeTakeFirstOrThrow();
        //if null take the []
        const [firstChapter] = course.chapters || [];
        const [firstSubject] = firstChapter?.subjects || [];
        const [firstContent] = firstSubject?.contents || [];

      await db
        .insertInto("UserCourseProgress")
        .values({
            userId,
            courseId: course.id,
            lastChapterId: firstChapter?.id || null,
            lastSubjectId: firstSubject?.id || null,
            firstUnwatchedContentId: firstContent?.id ||null,
            contentProgress: JSON.stringify([])
        })
        .executeTakeFirstOrThrow();

      return NextResponse.json(insertIntoUserCourses);
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error("Error in processCourseUserRequest:", error);
    return handleError(error);
  }
}
