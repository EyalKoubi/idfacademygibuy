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
import { Loading } from "react-daisyui";
import Illustration from "@/app/assets/Education-illustration.svg"
import Image from "next/image"; 
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

  const [isLoading, setIsLoading] = useState(true);

  const getData=async()=>{
    const response=await axios.get("/api/getData/")
    if(response.data.message){
      console.log("error to fetch data")
    }
    else{
      setUser(response.data.user)
      setCourses(response.data.courses)
      setIsLoading(false)

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
          <main className="min-h-screen bg-gradient-to-b from-sky-100 to-transparent">
              {isLoading ? (
                // Loading indicator while data is being fetched
                <div  className="flex flex-col justify-between items-center gap-10">
                  <div className="m-8">
               <Loading size="lg"/>
               </div>
               <Image src={Illustration} alt={""} />
               </div>
              ) : (
                <div className="flex flex-col justify-between items-center gap-10">
                {user&&<Navbar  userType={Users.Admin}/>}
                {/* {user&&<Sidebar userType={Users.Admin}/>} */}
                  {children}
                  
                </div>
             )}
          </main>
        </div>
      </body>
    </html>
  );
}
