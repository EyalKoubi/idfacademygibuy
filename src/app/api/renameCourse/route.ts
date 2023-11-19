import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseRename"))
    return NextResponse.json({ message: "There is no course input!" });
  const courseRenameProps:CourseData = JSON.parse(
    data.get("courseRename") as string
  );
  console.log("blabllbb-----",courseRenameProps)
  try {
    CourseSchema.parse(courseRenameProps)
    const updatedCourse = await db
      .updateTable("Course")
      .set({
        name: courseRenameProps.name,
      })
      .where("id", "=", courseRenameProps.id)
      .returning(["name","img_id","creationTimestamp"])
      .executeTakeFirstOrThrow();
    return NextResponse.json(updatedCourse);
  } catch (error) {
    return handleError(error)
  }
}
