import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

interface ChaptersRequest extends NextRequest {
  courseId?: string;
  chapterName?: string;
  chapterBrief?: string;
}

export async function POST(req: ChaptersRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseAddChapter"))
    return NextResponse.json({ message: "There is no course data!" });
  const addChapterProps = JSON.parse(data.get("courseAddChapter") as string);

  const courseId = addChapterProps.courseId;
  const chapterName = addChapterProps.chapterName;
  const chapterBrief = addChapterProps.chapterBrief;

  try {
    const newChapter = await db
      .insertInto("Chapter")
      .values({
        name: chapterName,
        brief: chapterBrief,
      })
      .returning(["id", "name", "brief"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("ChapterCourse")
      .values({
        chapterId: newChapter.id,
        courseId: courseId,
      })
      .execute();
    return NextResponse.json(newChapter);
  } catch (error) {
    console.error("Error inserting chapter:", error);
    return NextResponse.json({ message: "Error inserting chapter" });
  }
}
