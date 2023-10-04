"use client";
import { useEffect } from "react";
import { editTexts } from "@/HebrewStrings/Texts";
import useCoursesStore from "../../_contexts/courseContext";
import axios from "axios";
import Course from "./_components/Course";

const CourseManager = () => {
  const { setCourses, courses } = useCoursesStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/getCourses");
        setCourses(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:34 ~ CourseManager ~ courses:", courses);
  }, [courses]);

  return (
    <div>
      <h1 className="text-4xl mb-6">{editTexts.courses}</h1>
      <div className="bg-gray-100 min-h-screen p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseManager;
