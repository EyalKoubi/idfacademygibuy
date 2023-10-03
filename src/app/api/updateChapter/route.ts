import { NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

interface ChapterUpdateRequest extends NextRequest {
  name?: string;
  brief?: string;
}

export async function POST(req: ChapterUpdateRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("updateChapterProps"))
    return NextResponse.json({ message: "There is no course input!" });
  const updateChapterProps: { id: string; name: string; brief: string } =
    JSON.parse(data.get("updateChapterProps") as string);
  console.log(
    "🚀 ~ file: route.ts:17 ~ POST ~ updateChapterProps:",
    updateChapterProps
  );

  try {
    const updatedChapter = await db
      .updateTable("Chapter")
      .set({
        name: updateChapterProps.name,
        brief: updateChapterProps.brief,
      })
      .where("id", "=", updateChapterProps.id)
      .returning(["name", "brief"])
      .executeTakeFirstOrThrow();
    console.log(
      "🚀 ~ file: route.ts:29 ~ POST ~ updatedChapter:",
      updatedChapter
    );
    return NextResponse.json({
      message: `Updated successfully`,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error inserting course" });
  }
}
