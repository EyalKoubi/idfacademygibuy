import { CourseData } from "../types";
import { getAllCourses } from "./CourseController";
import { getUserCourseProgress, getUserCourseRequests, getUserCoursesIds } from "./CourseUserController";
import {  getUser } from "./UserController";

export async function fetchData() {
    try {
      const coursesFromDb = await getAllCourses();
      const courses=coursesFromDb?coursesFromDb:[];
      const userFromDb=await getUser("");//need to put id or something
      if(courses){
       const userCoursesIds = await getUserCoursesIds(userFromDb.id,4); // 4 is user role index
      // const adminCourses = await filterUserCourses(userFromDb.id, courses, 1); // 1 is admin role index
    //  const adminCourseIds = adminCourses.map(course => course.id);
      //const userRequests = await getUserCourseRequests(userFromDb.id,courses,adminCourseIds);
     // const userProgress = await getUserCourseProgress(userFromDb.id);

      const roleValue=1;// need to fix when will be roles (define role 1-admin)
      const data = {
        user: {
          ...userFromDb,
          role: roleValue
        },
        courses,
        userCoursesIds,
        // adminCourses,
        // userRequestsCourse:userRequests,
        //userCourseProgress: userProgress, // Include user course progress
      };
  
      return data;
    }
    } catch (error) {
      console.error("Error in fetchCourseData:", error);
      throw error; 
    }
  }