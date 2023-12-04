import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";


export async function GET(req: NextRequest, res: NextApiResponse) {
  const getUserCourses=async (userId:string,result:CourseData[],roleIndex:number)=>{
    const coursesidofuser=  await db.selectFrom("UserCourses")
    .where("userId", "=", userId)
    .where("role", "=", roleIndex)//4 is users courses
    .select(["UserCourses.courseId"])
    .execute();
    const courseIds = coursesidofuser.map(item => item.courseId);
    console.log(coursesidofuser)
    const userCourses=result.filter((course)=>courseIds.includes(course.id))
    return userCourses;
  }
  try {
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
    }
    //get users courses

    const userCourses=await getUserCourses(userFromDb.id,result,4)//4 is user role index
    console.log("userCourses",userCourses)
    const adminCourses=await getUserCourses(userFromDb.id,result,1)//1 is admin role index
    console.log("adminCourses",adminCourses)

    //define the role of user
    //const roleValue = adminCourses.length > 0 ? 1 : 4;
    const roleValue=1;// need to fix when will be roles (define role 1-admin)
    const data = {
      user: {
        ...userFromDb,
        role: roleValue
     },
      courses: result,
      userCourses,
      adminCourses
};
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ message: "Error fetching courses" });
  }
}