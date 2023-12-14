// ContentController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database";
import { ContentSchema, handleError } from "@/utils/validation";
import * as Minio from "minio";
import { uploadFileToS3Service, bucket,s3Client } from "@/app/_minio/minio";
import { ContentItemProgress } from "../types";

interface ContentData {
  file: File;
  comments: string;
  subjectId: string;
}

async function ensureBucketExists( bucket: string) {
  try {
    const exists = await s3Client.bucketExists(bucket);
    if (!exists) {
      await s3Client.makeBucket(bucket, "us-east-1");
      console.log(`Bucket ${bucket} created successfully.`);
    }
  } catch (error) {
    console.error("Error ensuring bucket exists:", error);
    throw error;
  }
}
async function processContent(contentData: ContentData) {
    const { file, comments, subjectId } = contentData;
  
    ContentSchema.parse({ file_size: file.size, comments });
    const newContent = await db
      .insertInto("Content")
      .values({ file_name: file.name, comments })
      .returning(["id", "file_name", "comments"])
      .executeTakeFirstOrThrow();
  
    if (!file) {
      throw new Error("File is missing");
    }
  
    await ensureBucketExists(bucket);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await uploadFileToS3Service(file, buffer, bucket, newContent.id);
  
    console.log("Files are being processed");
    return newContent;
  }
export async function addContentWithResponse(contentData: ContentData) {
    if (contentData.subjectId !== "") {
      try {
        const newContent = await processContent(contentData);
        return NextResponse.json(newContent);
      } catch (error) {
        console.error("Error in addContentWithResponse:", error);
        return handleError(error);
      }
    }
  }


export async function addContentWithoutResponse(contentData: ContentData) {
    if (contentData.subjectId === "") {
      try {
        return await processContent(contentData);
      } catch (error) {
        console.error("Error in addContentWithoutResponse:", error);
        throw error; // Rethrow error for handling at a higher level
      }
    }
  }
  
export async function addContent(contentData: ContentData){
  const { file, comments, subjectId } = contentData;

  try {
    ContentSchema.parse({ file_size: file.size, comments });
    const newContent = await db
      .insertInto("Content")
      .values({ file_name: file.name, comments })
      .returning(["id", "file_name", "comments"])
      .executeTakeFirstOrThrow();

    if (subjectId==='') {
      await db
        .insertInto("ContentSubject")
        .values({ contentId: newContent.id, subjectId })
        .execute();
    }

    if (!file) {
      return NextResponse.json({ success: false });
    }

    await ensureBucketExists(bucket);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await uploadFileToS3Service(file, buffer, bucket, newContent.id);
    console.log("Files are being processed");
    if(subjectId!=="")
        return NextResponse.json(newContent);
    else{
        return newContent
    }
  } catch (error) {
    console.error("Error in addContent:", error);
    return handleError(error);
  }
}
export async function deleteContent(contentId: string) {
    try {
      // Delete content from the database
      await db
        .deleteFrom("Content")
        .where("Content.id", "=", contentId)
        .executeTakeFirst();
  
      // Delete content from Minio
      await deleteByNameContentFromMinio(bucket, contentId);
  
      // Delete content from User Progress
      await deleteContentFromUserProgress(contentId);
  
      return NextResponse.json({ message: "Content deleted successfully!" });
    } catch (error) {
      console.error("Error in deleteContent:", error);
      return handleError(error); // Ensure you have a handleError function
    }
  }
export async function deleteContentFromUserProgress(contentId:string) {
    try {
      // Fetch all rows from UserCourseProgress
      const userCourseProgressRows = await db
        .selectFrom("UserCourseProgress")
        .selectAll()
        .execute();
  
      // Iterate over each row to modify the contentProgress
      for (const row of userCourseProgressRows) {
        // Parse the contentProgress JSONB field
        let contentProgress = JSON.parse(row.contentProgress);
  
        // Remove the specified content from contentProgress
        for (const cp of contentProgress) {
          cp.contents = cp.contents.filter((content:ContentItemProgress) => content.contentId !== contentId);
        }
  
        // Update the row with the modified contentProgress
        await db
          .updateTable("UserCourseProgress")
          .set({
            contentProgress: JSON.stringify(contentProgress) // Convert back to JSONB
          })
          .where("userId", "=", row.userId)
          .where("courseId", "=", row.courseId)
          .execute();
      }
    } catch (error) {
      console.error('Error in deleteContentFromUserProgress:', error);
      throw error;
    }
  }
  
  export async function deleteByNameContentFromMinio(bucket:string, objectName:string) {
    return new Promise((resolve, reject) => {
      s3Client.removeObject(bucket, objectName, (err) => {
        if (err) {
          console.error("Error deleting object:", err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
  
