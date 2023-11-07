import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ChapterSchema } from "@/utils/validation";
import { ZodError } from "zod";

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

  const courseId = addChapterProps.id;
  const chapterName = addChapterProps.name;
  const chapterBrief = addChapterProps.brief;
  try {
    ChapterSchema.parse(addChapterProps);
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
    if (error instanceof ZodError) {
      // const nameError = error.issues.find(issue => issue.path.includes('name'));
      // const briefError = error.issues.find(issue => issue.path.includes('brief'));
      // const message = nameError?.message ?nameError.message:briefError?.message;
      const errorMessages = error.issues.map(issue => issue.message);
      //onsole.log("my message "+message)
    return NextResponse.json({ message:errorMessages[0]});
  }
}
}
