"use client";
import { HomeTexts, editTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";
import useUserStore from "../_contexts/userContext";
import { findFirstUnwatched } from "@/utils/progressUtils";
import { CourseData, UserCourseProgress } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Assuming you have imported the Image component correctly
import Illustration from "@/app/assets/Education-illustration.svg" // Provide the correct path to your image

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
  < >
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-black text-6xl font-bold font-assistant">
          !התחילו ללמוד אצלנו היום
        </h1>
        <h2 className="text-black text-2xl font-assistant font-semibold">
          חפשו בין ה{120} קורסים הזמינים ללמידה
        </h2>
      </div>
      <div className="bg-white flex w-2/5 items-center justify-center p-4 rounded-md gap-5">
        <button className="btn flex-grow flex-shrink w-3/12 bg-emerald-700 hover:bg-emerald-800 text-white">
          חפש
        </button>
        <div className="flex flex-col w-6/12 text-sm rounded-md">
          <input
            className="rounded-md border p-3 focus:border-black focus:ring-0 focus:ring-black hover:border-black"
            type="text"
            placeholder="מה הקורס הבא שלך?"
            dir="rtl"
          />
        </div>
        <button className="btn flex-grow flex-shrink w-3/12 bg-emerald-700 hover:bg-emerald-800 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          קטגוריות
        </button>
      </div>
      <Image src={Illustration} alt={""} />
   </>
  );
};

export default HomePage;
