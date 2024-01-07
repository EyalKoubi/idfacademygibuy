"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./_component/SideBar";
import Navbar from "./_component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import useCoursesStore from "../_contexts/courseContext";
import { User } from "next-auth";
import useUserStore from "../_contexts/userContext";
import useUserRequestCourseStore from "../_contexts/requestsCoursesContext";

const inter = Inter({ subsets: ["latin"] });

enum Users {
  Admin = 1,
  Editor = 2,
  Creator = 3,
  User = 4,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCourses, courses } = useCoursesStore();
  const {user,userCourses,adminCourses,coursesProgress, setUser,setUserCourses,setAdminCourses,setCourseProgress}=useUserStore();
  const {setUserRequestsCourse}=useUserRequestCourseStore()

  
  const getData=async()=>{
    const response=await axios.get("/api/getData/")
    if(response.data.message){
      console.log("error to fetch data")
    }
    else{
      setUser(response.data.user)
      setCourses(response.data.courses)
      setUserCourses(response.data.userCourses)
      setAdminCourses(response.data.adminCourses)
      setUserRequestsCourse(response.data.userRequestsCourse)
      setCourseProgress(response.data.userCourseProgress)

      console.log("data from db :",response.data)
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <html>
      <body className={inter.className}>
        <div>
          <div className="flex flex-col text-right justify-end">
          {user&&<Navbar  userType={Users.Admin}/>}
            {children}
            {/* need to fix */}
            
          </div>
        </div>
      </body>
    </html>
  );
}
