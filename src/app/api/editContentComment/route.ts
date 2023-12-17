import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { ContentSchema, EditContentSchema, handleError } from "@/utils/validation";
import { editContentComments } from "@/app/_controllers/ContentController";

interface ContentRequest extends NextRequest {
  contentId?: string;
  comments?: string;
}

export async function POST(req:ContentRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("editCommentsProps")) {
    return NextResponse.json({ message: "There is no content input!" });
  }
  const editCommentsProps: { contentId: string; comments: string } = JSON.parse(data.get("editCommentsProps") as string);
  return editContentComments(editCommentsProps);
}
