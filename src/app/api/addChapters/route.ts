import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

interface ChaptersRequest extends NextRequest {
  courseId?: string;
  chapters?: { name: string; brief: string; subjects: any[] }[];
}

export async function POST(req: ChaptersRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseData"))
    return NextResponse.json({ message: "There is no course data!" });
  const courseData = JSON.parse(data.get("courseData") as string);

  const chapters = courseData.chapters;
  const courseId = courseData.courseId;

  try {
    for (let chapter of chapters) {
      const newChapter = await db
        .insertInto("Chapter")
        .values({
          name: chapter.name,
          brief: chapter.brief,
        })
        .returning(["id"])
        .executeTakeFirstOrThrow();
      await db
        .insertInto("ChapterCourse")
        .values({
          courseId,
          chapterId: newChapter.id,
        })
        .execute();
      for (let subject of chapter.subjects) {
        const newSubject = await db
          .insertInto("Subject")
          .values({
            name: subject.name,
          })
          .returning(["id"])
          .executeTakeFirstOrThrow();
        await db
          .insertInto("SubjectChapter")
          .values({
            chapterId: newChapter.id,
            subjectId: newSubject.id,
          })
          .execute();
      }
    }
    return NextResponse.json({ message: "course data added successfully!" });
  } catch (error) {
    console.error("Error inserting course data:", error);
    return NextResponse.json({ message: "Error inserting course data" });
  }
}
