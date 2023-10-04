import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface CourseRequest extends NextRequest {
  courseId?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseId"))
    return NextResponse.json({ message: "There is no course data!" });
  const courseId = data.get("courseId") as string;
  console.log("🚀 ~ file: route.ts:14 ~ POST ~ courseId:", courseId);

  try {
    const chapters = await db
      .selectFrom("ChapterCourse")
      .innerJoin("Chapter", "Chapter.id", "ChapterCourse.chapterId")
      .where("ChapterCourse.courseId", "=", courseId)
      .select(["Chapter.id", "Chapter.name", "Chapter.brief"])
      .execute();

    for (let chapter of chapters) {
      const subjects = await db
        .selectFrom("SubjectChapter")
        .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
        .where("SubjectChapter.chapterId", "=", chapter.id)
        .select(["Subject.id", "Subject.name"])
        .execute();

      await db
        .deleteFrom("Chapter")
        .where("Chapter.id", "=", chapter.id)
        .executeTakeFirst();

      for (let subject of subjects) {
        const contents = await db
          .selectFrom("ContentSubject")
          .innerJoin("Content", "Content.id", "ContentSubject.contentId")
          .where("ContentSubject.subjectId", "=", subject.id)
          .select(["Content.id", "Content.file_name"])
          .execute();
        for (let content of contents) {
          await db
            .deleteFrom("Content")
            .where("Content.id", "=", content.id)
            .executeTakeFirst();
        }
        await db
          .deleteFrom("Subject")
          .where("Subject.id", "=", subject.id)
          .executeTakeFirst();
      }
    }
    await db
      .deleteFrom("Course")
      .where("Course.id", "=", courseId)
      .executeTakeFirst();
    return NextResponse.json({ message: "course deleted successfully!" });
  } catch (error) {
    console.error("Error inserting course data:", error);
    return NextResponse.json({ message: "Error delete course" });
  }
}
