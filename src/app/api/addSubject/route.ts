import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface SubjectRequest extends NextRequest {
  name?: string;
  chapterId: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("addSubjectProps"))
    return NextResponse.json({ message: "There is no subject data!" });
  const addSubjectProps = JSON.parse(data.get("addSubjectProps") as string);

  const name = addSubjectProps.name;
  const chapterId = addSubjectProps.chapterId;

  try {
    const newSubject = await db
      .insertInto("Subject")
      .values({ name: name })
      .returning(["id", "name"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("SubjectChapter")
      .values({
        subjectId: newSubject.id,
        chapterId: chapterId,
      })
      .execute();

    return NextResponse.json(newSubject);
  } catch (error) {
    console.error("Error inserting subject:", error);
    return NextResponse.json({ message: "Error inserting subject" });
  }
}
