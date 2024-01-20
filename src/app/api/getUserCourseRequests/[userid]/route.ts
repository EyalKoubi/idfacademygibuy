
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";
import {fetchData} from "@/app/_controllers/DataController"
import { getUserCourseRequests, getUserCoursesIds } from "@/app/_controllers/CourseUserController";
interface getUserCourseRequestsProps{
  params:{
      userid:string;
} 
}

export async function GET(req: NextRequest, context: getUserCourseRequestsProps) {

  try{
    const { userid} = context.params;
    const adminCourseIds=await getUserCoursesIds(userid,1)
    const userCourseRequests = await getUserCourseRequests(userid,adminCourseIds);
    console.log(userCourseRequests);
    return NextResponse.json(userCourseRequests);
  } catch (error) {
  console.error("Error in GET request:", error);
  return NextResponse.json({ message: "Error fetching courses" });
  }
}