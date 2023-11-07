import { z } from 'zod';

export const CourseSchema = z.object({
    name: z.string()
      .min(1, { message: "Course name is required" })
      .regex(/^[\u0590-\u05FF ]+$/, { message: "Course name must contain only Hebrew characters and spaces" }),

    chapters: z.array(z.object({
      title: z.string().min(1, { message: "Chapter title is required" }),
      content: z.string().min(1, { message: "Chapter content is required" }),
    })),
  });
  
  export const ChapterSchema = z.object({
    id: z.string(), 
    name: z.string()
      .min(1, {message:'Chapter name cannot be empty'})
      .max(100, {message:'Chapter name must be less than 100 characters'})
      .regex(/^[\u0590-\u05FF ]+$/, { message: "chapter name must contain only Hebrew characters and spaces" }),
    brief: z.string()
      .min(1, {message:'Chapter brief cannot be empty'})
      .max(500, {message:'Chapter brief must be less than 500 characters'}) 
      .regex(/^[\u0590-\u05FF ]+$/, { message: "chapter brief must contain only Hebrew characters and spaces" }),
  });
  //export type CourseData = z.infer<typeof CourseSchema>;
  