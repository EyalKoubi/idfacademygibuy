import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

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
    const updatedCourse = await db
      .updateTable("Content")
      .set({
        comments: editCommentsProps.comments,
      })
      .where("id", "=", editCommentsProps.contentId)
      .returning(["comments"])
      .executeTakeFirstOrThrow();
    return NextResponse.json({
      message: `Content updated successfully!`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error updating content" });
  }
}
