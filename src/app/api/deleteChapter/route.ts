import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface ChapterRequest extends NextRequest {
  chapterId?: string;
}

export async function POST(req: ChapterRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("chapterId"))
    return NextResponse.json({ message: "There is no chapter data!" });
  const chapterId = data.get("chapterId") as string;

  try {
    const subjects = await db
      .selectFrom("SubjectChapter")
      .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
      .where("SubjectChapter.chapterId", "=", chapterId)
      .select(["Subject.id", "Subject.name"])
      .execute();

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
    await db
      .deleteFrom("Chapter")
      .where("Chapter.id", "=", chapterId)
      .executeTakeFirst();
    await db
      .updateTable("UserCourseProgress")
      .set({ lastChapterId: null })
      .where("lastChapterId", "=", chapterId)
      .execute();
    return NextResponse.json({ message: "chapter deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error delete chapter" });
  }
}
