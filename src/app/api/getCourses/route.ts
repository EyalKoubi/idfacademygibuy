import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const coursesWithChapters = await db
      .selectFrom("Course")
      .selectAll()
      .execute();

    const result = [];
    for (const course of coursesWithChapters) {
      const chaptersWithOutSubjects = await db
        .selectFrom("ChapterCourse")
        .innerJoin("Chapter", "Chapter.id", "ChapterCourse.chapterId")
        .where("ChapterCourse.courseId", "=", course.id)
        .select(["Chapter.id", "Chapter.name", "Chapter.brief"])
        .execute();
      const chapters = [];
      for (let chapterWithOutSubjects of chaptersWithOutSubjects) {
        const subjects = await db
          .selectFrom("SubjectChapter")
          .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
          .where("SubjectChapter.chapterId", "=", chapterWithOutSubjects.id)
          .select(["Subject.id", "Subject.name"])
          .execute();

        chapters.push({
          id: chapterWithOutSubjects.id,
          name: chapterWithOutSubjects.name,
          subjects: subjects,
        });
      }
      result.push({
        id: course.id,
        name: course.name,
        chapters: chapters,
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ message: "Error fetching courses" });
  }
}
