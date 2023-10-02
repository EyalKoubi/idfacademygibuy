import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const coursesWithChapters = await db
      .selectFrom("Course")
      .selectAll() // Select course ID and name
      .execute();

      const result = [];
    for (const course of coursesWithChapters) {
      const chapters = await db
        .selectFrom("ChapterCourse")
        .innerJoin("Chapter", "Chapter.id","ChapterCourse.chapterId")
        .where("ChapterCourse.courseId","=", course.id)
//         brief
// : 
// "שדגשדגשדג"
// chapterId
// : 
// "3dba4208-cd96-4f23-bdcd-0f6f24e95d99"
// courseId
// : 
// "73fe590a-8108-41fd-8d3b-4870817f6d88"
// id
// : 
// "3dba4208-cd96-4f23-bdcd-0f6f24e95d99"
// name
// : 
// "לררקע"
        .select(['Chapter.id','Chapter.name','Chapter.brief']) 
        .execute();
        result.push({
            id: course.id,
            name: course.name,
            chapters: chapters
        })
    }
  return NextResponse.json(result);
} catch (error) {
  console.error("Error fetching courses:", error);
  return NextResponse.json({ message: "Error fetching courses" });
    }
}
