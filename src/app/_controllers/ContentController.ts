// ContentController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database";
import { ContentMediaSchema, ContentTextSchema, EditContentSchema, handleError } from "@/utils/validation";
import * as Minio from "minio";
import { uploadFileToS3Service, bucket,s3Client } from "@/app/_minio/minio";
import { ContentData, ContentItemProgress } from "../types";
import imageUrl from '../../../public/assets/default-course-image.png';

import defaultImageCourse from "@/../public/assets/default-course-image.png";
import fs from "fs/promises";
interface ContentDataProps{
  file: File;
  title:string;
  comments: string;
  subjectId: string;
}
interface EditContentProps {
    contentId: string;
    title:string;
    comments: string;
  }
  

async function ensureBucketExists( bucket: string) {
  try {
    const exists = await s3Client.bucketExists(bucket);
    if (!exists) {
      await s3Client.makeBucket(bucket, "us-east-1");
    }
  } catch (error) {
    console.error("Error ensuring bucket exists:", error);
    throw error;
  }
}
export async function getContent(contentId:string|null):Promise<ContentData>{
    const contentFromDb=await db
    .selectFrom("Content")
    .where("id", "=", contentId)
    .selectAll()
    .executeTakeFirstOrThrow();
    return contentFromDb;
}
export async function getContentByName(contentName:string):Promise<ContentData|undefined>{
  try{
  const contentFromDb=await db
  .selectFrom("Content")
  .where("file_name", "=", contentName)
  .selectAll()
  .executeTakeFirstOrThrow();
  return contentFromDb;}
  catch{return undefined;}
}
export async function getDefaultImageCourseContent(file:File){
  const defaultfromDb= await getContentByName("default-image-course.png")
  console.log(defaultfromDb)
  if(defaultfromDb){
    console.log("the default page already exist")
    return defaultfromDb;
    
  }
  else{
    return await addDefaultCourseImageContent(file);
  }
}
export async function processContent(contentData: ContentDataProps) {
    const { file,title, comments, subjectId } = contentData;
    console.log("the file is :",file)
    ContentMediaSchema.parse({title, file_size: file.size, comments });
    //calculate estimated time 
    const processingSpeedMBPerSecond = 1;
    const fileSizeInMB = file.size / 1024 / 1024;
    const estimatedProcessingTimeInSeconds =fileSizeInMB>0?fileSizeInMB / processingSpeedMBPerSecond:2;
    const newContent = await db
      .insertInto("Content")
      .values({ title,file_name: file.name, comments,estimated_time_minutes:estimatedProcessingTimeInSeconds })
      .returning(["id","title", "file_name", "comments","estimated_time_minutes"])
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
export async function addContentWithResponse(contentData: ContentDataProps) {
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


export async function addContentWithoutResponse(contentData: ContentDataProps) {
    if (contentData.subjectId === "") {
      try {
        return await processContent(contentData);
      } catch (error) {
        console.error("Error in addContentWithoutResponse:", error);
        throw error; // Rethrow error for handling at a higher level
      }
    }
  }
  



export async function addDefaultCourseImageContent(file:File) {
  try {

   // Create a File object with all properties (optional)

   // Upload the file to Minio (optional)
    const contentData = {
      file: file,
      title:"",
      comments: "תמונת קורס ברירת מחדל",
      subjectId: "",
    };

    const newContent = await addContentWithoutResponse(contentData);
    console.log("Default Course Image uploaded to Minio and database.");
    return newContent as ContentData;
  } catch (error) {
    console.error("Error adding Default Course Image:", error);
    throw error;
  }
}
export async function addTextContent(title:string,editorValue: string, subjectId: string) {
  try {
    ContentTextSchema.parse({title,comments:editorValue}) 


    const contentData: ContentDataProps = {
      file: null as unknown as File, 
      title,
      comments: editorValue,
      subjectId,
    };
    const newContent = await db
    .insertInto("Content")
    .values({title, file_name: "", comments:editorValue })
    .returning(["id","title", "file_name", "comments"])
    .executeTakeFirstOrThrow();

  if (subjectId!=='') {
    await db
      .insertInto("ContentSubject")
      .values({ contentId: newContent.id, subjectId })
      .execute();
  }
    console.log("Text Content added to the database.");
    return NextResponse.json(newContent as ContentData);
  } catch (error) {
    console.error("Error adding Text Content:", error);
    throw error;
  }
}
export async function deleteContent(contentId: string) {
    try {
      // Delete content from the database
     const deletedContent= await db
        .deleteFrom("Content")
        .where("Content.id", "=", contentId)
        .returning(["Content.id","Content.title","Content.file_name","Content.comments"])
        .executeTakeFirst();
      if(deletedContent?.file_name!==""){
      // Delete content from Minio
          await deleteByNameContentFromMinio(bucket, contentId);
      }
  
      // Delete content from User Progress
      await deleteContentFromUserProgress(contentId);
  
      return NextResponse.json({contentId});
    } catch (error) {
      console.error("Error in deleteContent:", error);
      return handleError(error); 
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
  export async function editContentComments(editProps: EditContentProps) {
    try {
      EditContentSchema.parse(editProps);
  
      const updatedContent = await db
        .updateTable("Content")
        .set({ title:editProps.title,comments: editProps.comments })
        .where("id", "=", editProps.contentId)
        .returning(["title","comments"])
        .executeTakeFirstOrThrow();
  
      return NextResponse.json(updatedContent);
    } catch (error) {
      console.error("Error in editContentComments:", error);
      return handleError(error); // Ensure you have a handleError function
    }
}
