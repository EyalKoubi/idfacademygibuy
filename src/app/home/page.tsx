"use client";
import { HomeTexts, editTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";
import useUserStore from "../_contexts/userContext";
import { findFirstUnwatched } from "@/utils/progressUtils";
import { CourseData, UserCourseProgress } from "../types";
import { useRouter } from "next/navigation";

const HomePage = () => {
  
  const { setCourses, courses } = useCoursesStore();
  const {user,userCourses,coursesProgress, setUser,setUserCourses,setAdminCourses}=useUserStore();
  // const router = useRouter();
  useEffect(()=>{
    console.log(coursesProgress)
  },[])

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

  return (
    <div>
     {user && <h1 className="text-2xl">{` ${user.name}  ${getHebrewGreeting()} `}</h1>}
    </div>
  );
};

export default HomePage;
