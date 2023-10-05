"use client";
import { useEffect, useState } from "react";
import { editTexts } from "@/HebrewStrings/Texts";
import useCoursesStore from "../../_contexts/courseContext";
import { useRouter } from "next/navigation";

const CourseManager = () => {
  const { setCourses, courses } = useCoursesStore();
  const router = useRouter();

  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:34 ~ CourseManager ~ courses:", courses);
  }, [courses]);

  const courseChoiceHandle = (courseId: string) => {
    router.push(`/home/courseManager/${courseId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-4xl mb-6 text-center text-gray-800">
        {editTexts.courses}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {courses.map((course) => {
          return (
            <button
              key={course.id}
              onClick={() => courseChoiceHandle(course.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              {course.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseManager;
