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
    id: "",
    name: "",
    chapters: [],
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("course", JSON.stringify(courseData));

      const response = await axios.post("/api/courseAdd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      addCourse({
        id: response.data?.id,
        name: response.data?.name,
        chapters: [],
      });
      const courseId = response.data.id;
      router.push(`/home/courseManager/newCourse/${courseId}`);
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
      <button onClick={handleSubmit}>{adminTexts.adminAddCourse}</button>
    </div>
  );
};

export default AddCoursePage;
