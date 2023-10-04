import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface SubjectRequest extends NextRequest {
  subjectId?: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("subjectId"))
    return NextResponse.json({ message: "There is no subject data!" });
  const subjectId = data.get("subjectId") as string;

  try {
    const contents = await db
      .selectFrom("ContentSubject")
      .innerJoin("Content", "Content.id", "ContentSubject.contentId")
      .where("ContentSubject.subjectId", "=", subjectId)
      .select(["Content.id", "Content.file_name"])
      .execute();
    for (let content of contents) {
      await db
        .deleteFrom("Content")
        .where("Content.id", "=", content.id)
        .executeTakeFirst();
    }
    await db
      .deleteFrom("Subject")
      .where("Subject.id", "=", subjectId)
      .executeTakeFirst();
    return NextResponse.json({ message: "subject deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error delete subject" });
  }
}
