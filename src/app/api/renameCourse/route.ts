import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseRename"))
    return NextResponse.json({ message: "There is no course input!" });
  const courseRenameProps: { id: string; name: string } = JSON.parse(
    data.get("courseRename") as string
  );
  console.log(
    "🚀 ~ file: route.ts:17 ~ POST ~ courseRenameProps.name:",
    courseRenameProps.name
  );

  try {
    const updatedCourse = await db
      .updateTable("Course")
      .set({
        name: courseRenameProps.name,
      })
      .where("id", "=", courseRenameProps.id)
      .returning(["name"])
      .executeTakeFirstOrThrow();
    console.log(
      "🚀 ~ file: route.ts:30 ~ POST ~ updatedCourse:",
      updatedCourse
    );
    return NextResponse.json({
      message: `Course ${courseRenameProps.name} changed to ${updatedCourse.name} successfully`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error inserting course" });
  }
}
