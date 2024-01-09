// CourseController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database"; // Adjust the import path as needed
import { CourseSchema, handleError } from "@/utils/validation";
import { ContentData, CourseData } from "@/app/types";
import { deleteChapter } from "@/app/_controllers/ChapterController"; 
import { deleteContent, getContent } from "./ContentController";

interface CourseCreationData {
  name: string;
  img_id: ContentData;
  creationTimestamp: Date;
  subscribe_num: number;
  description_sub_title: string;
  description: string;
  rate: number;
  userId: string;
}
interface CourseDataWithoutChaptersProps{
    id: string;
    name: string;
    img_id: string | undefined;
    creationTimestamp: Date | null;
    subscribe_num: number;
    description_sub_title: string;
    description: string;
    rate: number;
}

export async function createCourse(courseData: CourseCreationData) {
  try {
    const { name, img_id, creationTimestamp,subscribe_num,description_sub_title,description,rate, userId } = courseData;
    
    const courseToDb = { name, img_id:img_id.id, creationTimestamp ,subscribe_num,description_sub_title,description,rate};
    CourseSchema.parse(courseToDb);
    
    const newCourse = await db
      .insertInto("Course")
      .values(courseToDb)
      .returning(["id", "name", "img_id", "creationTimestamp","subscribe_num","description_sub_title","description","rate"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("UserCourses")  .values({ courseId: newCourse.id, userId, role: 1 })
    
      .executeTakeFirstOrThrow();

    const courseToClient: CourseData = {
      id: newCourse.id,
      name: newCourse.name,
      img_id: img_id, // Assuming you'll handle the image content in the frontend
      creationTimestamp: newCourse.creationTimestamp,
      subscribe_num,
      description_sub_title,
      description,
      rate,
      chapters: []
    };

    return NextResponse.json(courseToClient);
  } catch (error) {
    return handleError(error); 
  }
}

export async function deleteCourse(courseId: string,img_id:string) {
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
    deleteContent(img_id)
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
  

  const result:CourseData[] = [];
  for (const course of coursesWithChapters) {
    const courseContent:ContentData = await db
      .selectFrom("Content")
      .where("id", "=", course.img_id)
      .select(["id","title", "file_name", "comments"])
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
          .select(["Content.id","Content.title", "Content.file_name", "Content.comments"])
          .execute();

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
      subscribe_num:course.subscribe_num,
      description_sub_title:course.description_sub_title,
      description:course.description,
      rate:course.rate,
      chapters: chapters,
    });
    return result;
  }
}
// export async function getAllCourses(): Promise<CourseData[] | undefined> {
//   try {
//     const coursesWithChapters = await db
//       .selectFrom("Course")
//       .selectAll()
//       .execute();

//     const courseContentIds = coursesWithChapters.map((course) => course.img_id).filter(Boolean);

//     const courseContents = await Promise.all(
//       courseContentIds.map(async (contentId) => {
//         const content: ContentData = await db
//           .selectFrom("Content")
//           .where("id", "=", contentId)
//           .select(["id", "title", "file_name", "comments"])
//           .executeTakeFirstOrThrow();
//         return { [contentId]: content };
//       })
//     );

//     const courseContentsMap: Record<string, ContentData> = Object.assign({}, ...courseContents);

//     const result: CourseData[] = await Promise.all(
//       coursesWithChapters.map(async (course) => {
//         const chaptersWithOutSubjects = await db
//           .selectFrom("ChapterCourse")
//           .innerJoin("Chapter", "Chapter.id", "ChapterCourse.chapterId")
//           .where("ChapterCourse.courseId", "=", course.id)
//           .select(["Chapter.id", "Chapter.name", "Chapter.brief"])
//           .execute();

//         const chapters = await Promise.all(
//           chaptersWithOutSubjects.map(async (chapterWithOutSubjects) => {
//             const subjectsWithOutContents = await db
//               .selectFrom("SubjectChapter")
//               .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
//               .where("SubjectChapter.chapterId", "=", chapterWithOutSubjects.id)
//               .select(["Subject.id", "Subject.name"])
//               .execute();

//             const subjects = await Promise.all(
//               subjectsWithOutContents.map(async (subjectWithOutContents) => {
//                 const contents = await db
//                   .selectFrom("ContentSubject")
//                   .innerJoin("Content", "Content.id", "ContentSubject.contentId")
//                   .where("ContentSubject.subjectId", "=", subjectWithOutContents.id)
//                   .select(["Content.id", "Content.title", "Content.file_name", "Content.comments"])
//                   .execute();

//                 return {
//                   id: subjectWithOutContents.id,
//                   name: subjectWithOutContents.name,
//                   contents: contents,
//                 };
//               })
//             );

//             return {
//               id: chapterWithOutSubjects.id,
//               name: chapterWithOutSubjects.name,
//               brief: chapterWithOutSubjects.brief,
//               subjects: subjects,
//             };
//           })
//         );

//         const courseContentId = course.img_id;
//         const courseContent = courseContentId ? courseContentsMap[courseContentId] : null;

//         return {
//           id: course.id,
//           name: course.name,
//           img_id: courseContent,
//           creationTimestamp: course.creationTimestamp,
//           chapters: chapters,
//           subscribe_num: course.subscribe_num,
//           description_sub_title: course.description_sub_title,
//           description: course.description,
//           rate: course.rate,
//         };
//       })
//     );

//     return result;
//   } catch (error) {
//     // Handle any errors or exceptions here
//     console.error("Error fetching courses:", error);
//     return undefined;
//   }
// }
export async function editCourse(courseData: CourseDataWithoutChaptersProps) {
    try {
      CourseSchema.parse(courseData);
  
      const updatedCourse = await db
        .updateTable("Course")
        .set({ name: courseData.name,description_sub_title:courseData.description_sub_title,description:courseData.description })
        .where("id", "=", courseData.id)
        .returning(["id", "name", "img_id", "creationTimestamp","subscribe_num","description_sub_title","description","rate"])
        .executeTakeFirstOrThrow();
  
      const contentImage = getContent(updatedCourse.img_id)
  
      return NextResponse.json({
        id: updatedCourse.id,
        name: updatedCourse.name,
        img_id: contentImage,
        creationTimestamp: updatedCourse.creationTimestamp,
        subscribe_num:updatedCourse.subscribe_num,
        description_sub_title: updatedCourse.description_sub_title,
        description: updatedCourse.description,
        rate: updatedCourse.rate,

      });
    } catch (error) {
      console.error("Error in editCourse:", error);
      return handleError(error);
    }
  }
