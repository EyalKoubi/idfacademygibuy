import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";
export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    console.log("reach to get user")
    const userFromDb = await db
      .selectFrom("User")
      //.where("User.id", "=", ) need to fix
      .selectAll()
      .executeTakeFirstOrThrow();
   
    
    console.log(userFromDb)
    return NextResponse.json(userFromDb);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ message: "Error fetching courses" });
  }
}