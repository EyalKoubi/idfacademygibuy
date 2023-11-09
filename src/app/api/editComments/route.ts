import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { ContentSchema, EditContentSchema, handleError } from "@/utils/validation";

interface ContentRequest extends NextRequest {
  contentId?: string;
  comments?: string;
}

export async function POST(req: ContentRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("editCommentsProps"))
    return NextResponse.json({ message: "There is no content input!" });
  const editCommentsProps: { contentId: string; comments: string } = JSON.parse(
    data.get("editCommentsProps") as string
  );

  console.log(
    "🚀 ~ file: route.ts:19 ~ POST ~ editCommentsProps:",
    editCommentsProps
  );

  try { 
    EditContentSchema.parse(editCommentsProps)
    const updatedContent = await db
      .updateTable("Content")
      .set({
        comments: editCommentsProps.comments,
      })
      .where("id", "=", editCommentsProps.contentId)
      .returning(["comments"])
      .executeTakeFirstOrThrow();
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.log(error)
     return handleError(error)
  }
}
