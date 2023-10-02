"use client";
import { HomeTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";

const HomePage = () => {
  const {setCourses,courses}=useCoursesStore()
    useEffect(()=>{
      console.log("🚀 ~ file: page.tsx:12 ~ HomePage ~ courses:", courses)
    },[courses])
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/getCourses");
        // Do something with the response data here
        setCourses(response.data)
       // console.log("🚀 ~ file: page.tsx:15 ~ fetchData ~ response.data:", response.data)
        
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <h1>{HomeTexts.welcome}</h1>
    </div>
  );
};

export default HomePage;
