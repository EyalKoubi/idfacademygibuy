import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/database"; // adjust the import according to your actual db import
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;
  console.log("🚀 ~ file: courses.ts:7 ~ POST ~ req.body:", req.body);

  try {
    const newCourse = await db
      .insertInto("Course")
      .values({
        name: name,
      })
      .returning(["id", "name as name"])
      .execute();
    NextResponse.json(newCourse);
  } catch (error) {
    console.error("Error inserting course:", error);
    NextResponse.json({ message: "Error inserting course" });
  }

  return;
}
