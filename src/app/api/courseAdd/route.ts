import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  const name: string | null = data.get("name") as unknown as string;
  console.log("🚀 ~ file: route.ts:12 ~ POST ~ name:", name);
  console.log("🚀 ~ file: route.ts:11 ~ POST ~ data:", data);
  // console.log("🚀 ~ file: route.ts:7 ~ POST ~ name:", name);

  try {
    const newCourse = await db
      .insertInto("Course")
      .values({
        name: name,
      })
      .execute();
    NextResponse.json(newCourse);
  } catch (error) {
    console.error("Error inserting course:", error);
    NextResponse.json({ message: "Error inserting course" });
  }

  return NextResponse.json({ message: "added successfully" });
}
