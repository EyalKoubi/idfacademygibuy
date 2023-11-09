import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError } from "@/utils/validation";

interface SubjectRequest extends NextRequest {
  name?: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("subjectRename"))
    return NextResponse.json({ message: "There is no subject input!" });
  const subjectRenameProps: { id: string; name: string } = JSON.parse(
    data.get("subjectRename") as string
  );

  try {
    SubjectSchema.parse(subjectRenameProps)
    const updatedSubject = await db
      .updateTable("Subject")
      .set({
        name: subjectRenameProps.name,
      })
      .where("id", "=", subjectRenameProps.id)
      .returning(["name"])
      .executeTakeFirstOrThrow();
    return NextResponse.json(updatedSubject);
  }  catch (error) {
    console.log(error)
     return handleError(error)
  }
}
