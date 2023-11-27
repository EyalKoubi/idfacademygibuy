"use client";
import { HomeTexts, editTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";
import useUserStore from "../_contexts/userContext";

const HomePage = () => {
  
  const { setCourses, courses } = useCoursesStore();
  const {user, setUser,setUserCourses,setAdminCourses}=useUserStore();

  function getHebrewGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return HomeTexts.goodMorning; 
    } else if (currentHour < 18) {
        return HomeTexts.goodAfterNoon; 
    } else {
      return HomeTexts.goodEvening;  
    }
}
  const getData=async()=>{
    const response=await axios.get("/api/getData/")
    if(response.data.message){
      console.log("error to fetch data")
    }
    else{
      await setUser(response.data.user)
      setCourses(response.data.courses)
      setUserCourses(response.data.userCourses)
      setAdminCourses(response.data.adminCourses)
      console.log("data from db :",response.data)
    }
  }
  // useEffect(() => {
  //   console.log("🚀 ~ file: page.tsx:12 ~ HomePage ~ courses:", courses);
  // }, [courses,user]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
     {user && <h1 className="text-2xl">{` ${user.name}  ${getHebrewGreeting()} `}</h1>}
    </div>
  );
};

export default HomePage;
