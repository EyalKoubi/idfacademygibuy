// CourseController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database"; // Adjust the import path as needed
import { CourseSchema, handleError } from "@/utils/validation";
import { ContentData, CourseData } from "@/app/types";
import { deleteChapter } from "@/app/_controllers/ChapterController"; 

interface CourseCreationData {
  name: string;
  img_id: ContentData;
  creationTimestamp: Date;
  userId: string;
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
