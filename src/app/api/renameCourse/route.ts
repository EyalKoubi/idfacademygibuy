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
  const courseToDb={
    id: courseRenameProps.id,
    name: courseRenameProps.name,
    img_id:courseRenameProps.img_id?.id,
    creationTimestamp:courseRenameProps.creationTimestamp,
    
  }
  //console.log("blabllbb-----",courseRenameProps)
  try {
    CourseSchema.parse(courseToDb)
    const updatedCourse = await db
      .updateTable("Course")
      .set({
        name: courseRenameProps.name,
      })
      .where("id", "=", courseRenameProps.id)
      .returning(["id","name","img_id","creationTimestamp"])
      .executeTakeFirstOrThrow();

      const contentImage = await db
      .selectFrom("Content")
      .where("id", "=", updatedCourse.img_id)
      .selectAll()
      .executeTakeFirstOrThrow();
    return NextResponse.json({
      id: courseRenameProps.id,
      name: courseRenameProps.name,
      img_id:contentImage,
      creationTimestamp:courseRenameProps.creationTimestamp,
      
    });
  } catch (error) {
    return handleError(error)
  }
}
