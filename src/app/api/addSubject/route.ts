import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError} from "@/utils/validation";

interface SubjectRequest extends NextRequest {
  name?: string;
  chapterId: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  //console.log("asdasdas")
  const data = await req.formData();
  if (!data.get("addSubjectProps"))
    return NextResponse.json({ message: "There is no subject data!" });
  const addSubjectProps = JSON.parse(data.get("addSubjectProps") as string);
  //console.log(addSubjectProps)
  const name = addSubjectProps.name;
  const chapterId = addSubjectProps.chapterId;
 // console.log("asdasdas")
  try {
    console.log("asdasdas")
  SubjectSchema.parse({name});
   //await  console.log("sdfsdfsdfsdfds")
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
    console.log(error)
     return handleError(error)
  }
}
