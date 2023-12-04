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
  const {user, setUser,setUserCourses,setAdminCourses}=useUserStore();

  
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
          <Navbar />
          <div className="flex justify-end bg-gray-100">
            {children}
            {/* need to fix */}
            {user&&<Sidebar userType={Users.Admin}/>}
            {/* if have admin courses do admin menu (1 enum ) else (4) */}
          </div>
        </div>
      </body>
    </html>
  );
}
