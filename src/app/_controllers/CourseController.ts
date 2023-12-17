// CourseController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database"; // Adjust the import path as needed
import { CourseSchema, handleError } from "@/utils/validation";
import { ContentData, CourseData } from "@/app/types";
import { deleteChapter } from "@/app/_controllers/ChapterController"; 
import { getContent } from "./ContentController";

interface CourseCreationData {
  name: string;
  img_id: ContentData;
  creationTimestamp: Date;
  userId: string;
}
interface CourseDataWithoutChaptersProps{
    id: string;
    name: string;
    img_id: string | undefined;
    creationTimestamp: Date | null;
}

export async function createCourse(courseData: CourseCreationData) {
  try {
    const { name, img_id, creationTimestamp, userId } = courseData;
    
    const courseToDb = { name, img_id:img_id.id, creationTimestamp };
    CourseSchema.parse(courseToDb);
    
    const newCourse = await db
      .insertInto("Course")
      .values(courseToDb)
      .returning(["id", "name", "img_id", "creationTimestamp"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("UserCourses")
      .values({ courseId: newCourse.id, userId, role: 1 })
      .executeTakeFirstOrThrow();

    const courseToClient: CourseData = {
      id: newCourse.id,
      name: newCourse.name,
      img_id: img_id, // Assuming you'll handle the image content in the frontend
      creationTimestamp: newCourse.creationTimestamp,
      chapters: []
    };

    return NextResponse.json(courseToClient);
  } catch (error) {
    return handleError(error); 
  }
}

export async function deleteCourse(courseId: string) {
  try {
    // Fetch and delete related chapters
    const chapters = await db
      .selectFrom("ChapterCourse")
      .innerJoin("Chapter", "Chapter.id", "ChapterCourse.chapterId")
      .where("ChapterCourse.courseId", "=", courseId)
      .select(["Chapter.id", "Chapter.name", "Chapter.brief"])
      .execute();

    for (let chapter of chapters) {
      await deleteChapter(chapter.id); // Ensuring deleteChapter handles response correctly
    }

    // Delete the course itself
    await db
      .deleteFrom("Course")
      .where("Course.id", "=", courseId)
      .executeTakeFirst();

    return NextResponse.json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteCourse:", error);
    return handleError(error); // Ensure you have a handleError function
  }
}

//get data
export async function getAllCourses():Promise<CourseData[]|undefined> {
    const userFromDb = await db
    .selectFrom("User")
    //.where("User.id", "=", ) need to fix when will be a lot of users
    .selectAll()
    .executeTakeFirstOrThrow();
  const coursesWithChapters = await db
    .selectFrom("Course")
    .selectAll()
    .execute();
  
  console.log("courses",coursesWithChapters)

  const result:CourseData[] = [];
  for (const course of coursesWithChapters) {
    const courseContent:ContentData = await db
      .selectFrom("Content")
      .where("id", "=", course.img_id)
      .select(["id", "file_name", "comments"])
      .executeTakeFirstOrThrow();

    const chaptersWithOutSubjects = await db
      .selectFrom("ChapterCourse")
      .innerJoin("Chapter", "Chapter.id", "ChapterCourse.chapterId")
      .where("ChapterCourse.courseId", "=", course.id)
      .select(["Chapter.id", "Chapter.name", "Chapter.brief"])
      .execute();
    const chapters = [];
    for (let chapterWithOutSubjects of chaptersWithOutSubjects) {
      const subjectsWithOutContents = await db
        .selectFrom("SubjectChapter")
        .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
        .where("SubjectChapter.chapterId", "=", chapterWithOutSubjects.id)
        .select(["Subject.id", "Subject.name"])
        .execute();
      const subjects = [];
      for (let subjectWithOutContents of subjectsWithOutContents) {
        const contents = await db
          .selectFrom("ContentSubject")
          .innerJoin("Content", "Content.id", "ContentSubject.contentId")
          .where("ContentSubject.subjectId", "=", subjectWithOutContents.id)
          .select(["Content.id", "Content.file_name", "Content.comments"])
          .execute();
        console.log("🚀 ~ file: route.ts:36 ~ GET ~ contents:", contents);
        subjects.push({
          id: subjectWithOutContents.id,
          name: subjectWithOutContents.name,
          contents: contents,
        });
      }
      chapters.push({
        id: chapterWithOutSubjects.id,
        name: chapterWithOutSubjects.name,
        brief: chapterWithOutSubjects.brief,
        subjects: subjects,
      });
    }
    result.push({
      id: course.id,
      name: course.name,
      img_id:courseContent,
      creationTimestamp:course.creationTimestamp,
      chapters: chapters,
    });
    console.log("🚀 ~ file: route.ts:54 ~ GET ~ result:", result);
    return result;
  }
}
export async function editCourse(courseData: CourseDataWithoutChaptersProps) {
    try {
      CourseSchema.parse(courseData);
  
      const updatedCourse = await db
        .updateTable("Course")
        .set({ name: courseData.name })
        .where("id", "=", courseData.id)
        .returning(["id", "name", "img_id", "creationTimestamp"])
        .executeTakeFirstOrThrow();
  
      const contentImage = getContent(updatedCourse.img_id)
  
      return NextResponse.json({
        id: updatedCourse.id,
        name: updatedCourse.name,
        img_id: contentImage,
        creationTimestamp: updatedCourse.creationTimestamp
      });
    } catch (error) {
      console.error("Error in editCourse:", error);
      return handleError(error);
    }
  }
