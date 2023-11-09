import { NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import Chapter from "@/app/home/courseCatalog/_components/chapter";
import { ChapterSchema, handleError } from "@/utils/validation";

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
    ChapterSchema.parse(updateChapterProps)
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
    return NextResponse.json(updatedChapter);
  }  catch (error) {
    console.log(error)
     return handleError(error)
  }
}
