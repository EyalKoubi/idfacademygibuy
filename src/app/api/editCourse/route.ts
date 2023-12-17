import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";
import { editCourse } from "@/app/_controllers/CourseController";

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
  return editCourse(courseToDb);

}
