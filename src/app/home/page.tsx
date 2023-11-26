"use client";
import { HomeTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";
import useUserStore from "../_contexts/userContext";

const HomePage = () => {
  
  const { setCourses, courses } = useCoursesStore();
  const {user, setUser,setUserCourses}=useUserStore();


  const getData=async()=>{
    const response=await axios.get("/api/getData/")
    if(response.data.message){
      
    }
    else{
      await setUser(response.data.user)
      setCourses(response.data.courses)
      setUserCourses(response.data.userCourses)
      console.log(response.data)
    }
  }
  const fetchUser=async()=>{
    const response=await axios.get("/api/getUser/")
    if(response.data.message){
      
    }
    else{
      await setUser(response.data)
      console.log(response.data)
    }
  }
  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:12 ~ HomePage ~ courses:", courses);
  }, [courses]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/getCourses/${user.id}`);
        console.log(
          "🚀 ~ file: page.tsx:17 ~ fetchData ~ response.data:",
          response.data
        );
        setCourses(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
   // fetchUser();
   // fetchData();
    getData();
  }, []);

  return (
    <div>
      <h1>{HomeTexts.welcome}</h1>
    </div>
  );
};

export default HomePage;
