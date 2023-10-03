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
    await db
      .deleteFrom("Subject")
      .where("Subject.id", "=", subjectId)
      .executeTakeFirst();
    return NextResponse.json({ message: "subject deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error delete subject" });
  }
}
