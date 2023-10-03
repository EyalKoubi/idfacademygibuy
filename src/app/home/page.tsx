"use client";
import { HomeTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";

const HomePage = () => {
  const { setCourses, courses } = useCoursesStore();
  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:12 ~ HomePage ~ courses:", courses);
  }, [courses]);
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

  return (
    <div>
      <h1>{HomeTexts.welcome}</h1>
    </div>
  );
};

export default HomePage;
