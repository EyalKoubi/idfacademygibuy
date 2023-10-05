"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import { CourseData } from "../../courseCreation/types";
import Course from "../_components/Course";
import { useRouter } from "next/navigation";
import { GeneralTexts } from "@/HebrewStrings/Texts";
import axios from "axios";

const SingleCourseUpdate = () => {
  const courseId =
    usePathname().split("/")[usePathname().split("/").length - 1];
  const [curCourse, setCurCourse] = useState<CourseData>({
    id: "",
    name: "",
    chapters: [],
  });
  const { courses, setCourses } = useCoursesStore();
  const router = useRouter();

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

  useEffect(() => {
    for (let course of courses) {
      if (course.id === courseId) {
        setCurCourse(course);
        break;
      }
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-5 flex flex-col items-center justify-center">
      <button
        onClick={() => router.push("/home/courseManager")}
        className="mb-5 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        {GeneralTexts.back}
      </button>
      <Course course={curCourse} />
      {/* <div className="w-full max-w-2xl">בב</div> */}
    </div>
  );
};

export default SingleCourseUpdate;
