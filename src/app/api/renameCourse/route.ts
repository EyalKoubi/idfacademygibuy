import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
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

  try {
    const updatedCourse = await db
      .updateTable("Course")
      .set({
        name: courseRenameProps.name,
      })
      .where("id", "=", courseRenameProps.id)
      .returning(["name"])
      .executeTakeFirstOrThrow();
    return NextResponse.json({
      message: `Course ${courseRenameProps.name} changed to ${updatedCourse.name} successfully`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error inserting course" });
  }
}
