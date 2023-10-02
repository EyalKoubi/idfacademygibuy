"use client";
import { useEffect, useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "./types";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";

const AddCoursePage = () => {
  const { addCourse, courses } = useCoursesStore();
  const [courseData, setCourseData] = useState<CourseData>({
    name: "",
    chapters: [],
  });
  const router = useRouter();

  const handleAddChapters = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("course", JSON.stringify(courseData));

      const response = await axios.post("/api/courseAdd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log(
        "🚀 ~ file: page.tsx:47 ~ handleApproveCourse ~ response:",
        response
      );
      const courseId = response.data.id;
      router.push(`/home/courseManager/${courseId}/Chapters`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>{adminTexts.adminAddCourse}</h1>
      <input
        type="text"
        placeholder={AddCourseTexts.courseName}
        value={courseData.name}
        onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
      />
      <button onClick={handleAddChapters}>{adminTexts.adminAddCourse}</button>
    </div>
  );
};

export default AddCoursePage;
