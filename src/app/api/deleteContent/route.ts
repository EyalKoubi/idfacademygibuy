import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";

interface ContentRequest extends NextRequest {
  contentId?: string;
}

export async function POST(req: ContentRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("contentId"))
    return NextResponse.json({ message: "There is no content data!" });
  const contentId = data.get("contentId") as string;

  try {
    await db
      .deleteFrom("Content")
      .where("Content.id", "=", contentId)
      .executeTakeFirst();

    return NextResponse.json({ message: "content deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error delete content" });
  }
}
