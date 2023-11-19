import { NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

export const ContentSchema = z.object({
  id: z.string().optional(), // Assuming 'id' should be a string and is not mandatory
  file_size: z.number()
    .positive({ message: "File size must be a positive number" }) // Ensuring the number is positive
    .max(2500000000, { message: "File size must be less than 250MB" }), // Assuming the max file size is 50MB for example
  comments: z.string()
    .min(1, { message: "Comments cannot be empty" }) // Ensuring comments are not empty
    .max(1000, { message: "Comments must be less than 1000 characters" })
    .regex(/^[\u0590-\u05FF ]+$/, { message: "comments must contain only Hebrew characters and spaces" }), // Assuming the max length is 1000 characters
});

export const EditContentSchema = z.object({
  contentId: z.string().min(1,{message:""}), // Assuming 'id' should be a string and is not mandatory
  comments: z.string()
    .min(1, { message: "Comments cannot be empty" }) // Ensuring comments are not empty
    .max(1000, { message: "Comments must be less than 1000 characters" })
    .regex(/^[\u0590-\u05FF ]+$/, { message: "comments must contain only Hebrew characters and spaces" }), // Assuming the max length is 1000 characters
});

export const CourseSchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .min(1, { message: "Course name is required" })
    .regex(/^[\u0590-\u05FF ]+$/, { message: "Course name must contain only Hebrew characters and spaces" }),
  img_id:  z.string()
  .min(1, { message: "Course image is required" }),
  creationTimestamp: z.string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" })
    .refine(val => new Date(val) <= new Date(), { message: "Date cannot be in the future" }),
  chapters: z.array(z.object({
    title: z.string().min(1, { message: "Chapter title is required" }),
    content: z.string().min(1, { message: "Chapter content is required" }),
  })).optional(),
});
  
  export const ChapterSchema = z.object({
    id: z.string().optional(), 
    name: z.string()
      .min(1, {message:'Chapter name cannot be empty'})
      .max(100, {message:'Chapter name must be less than 100 characters'})
      .regex(/^[\u0590-\u05FF ]+$/, { message: "chapter name must contain only Hebrew characters and spaces" }),
    brief: z.string()
      .min(1, {message:'Chapter brief cannot be empty'})
      .max(500, {message:'Chapter brief must be less than 500 characters'}) 
      .regex(/^[\u0590-\u05FF ]+$/, { message: "chapter brief must contain only Hebrew characters and spaces" }),
  });

  export const SubjectSchema = z.object({
    id: z.string().optional(), 
    name: z.string()
      .min(1, {message:'subject name cannot be empty'})
      .max(100, {message:'subject name must be less than 100 characters'})
      .regex(/^[\u0590-\u05FF ]+$/, { message: "subject name must contain only Hebrew characters and spaces" }),
    chapterId: z.string()
      .min(1, {message:'chapter id cannot be empty'})
      .max(500, {message:'chapter id must be less than 500 characters'}).optional()
  });

  //function to treat in zod error and return value to client
  export const handleError=(error:any)=>{
    
    if (error instanceof ZodError) {
        console.log(error)
        const errorMessages = error.issues.map(issue => issue.message);
        console.log("asdasdasd"+ errorMessages)
        return NextResponse.json({ message:errorMessages[0]});
    }
    else{
    console.error("MY Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" });
    }
  }