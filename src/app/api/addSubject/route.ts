import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface SubjectRequest extends NextRequest {
  courseId?: string;
  chapterId?: string;
  subjectName?: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("addSubjectProps"))
    return NextResponse.json({ message: "There is no subject data!" });
  const addSubjectProps = JSON.parse(data.get("addSubjectProps") as string);

  const courseId = addSubjectProps.courseId;
  const chapterId = addSubjectProps.chapterId;
  const subjectName = addSubjectProps.subjectName;

  try {
    const newSubject = await db
      .insertInto("Subject")
      .values({
        name: subjectName,
      })
      .returning(["id", "name"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("SubjectChapter")
      .values({
        chapterId: chapterId,
        subjectId: newSubject.id,
      })
      .execute();

    return NextResponse.json({
      id: newSubject.id,
      name: newSubject.name,
      contents: [],
    });
  } catch (error) {
    console.error("Error inserting subject:", error);
    return NextResponse.json({ message: "Error inserting subject" });
  }
}
