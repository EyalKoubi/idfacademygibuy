"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./_component/SideBar";
import Navbar from "./_component/Navbar";
import { useEffect } from "react";
import axios from "axios";
import useCoursesStore from "../_contexts/courseContext";

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
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("api/getCourses");
        console.log(
          "🚀 ~ file: page.tsx:17 ~ fetchData ~ response.data:",
          response.data
        );
        setCourses(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  },[])
  return (
    <html>
      <body className={inter.className}>
        <div>
          <Navbar />
          <div className="flex justify-end">
            {children}
            <Sidebar userType={Users.Admin} />
          </div>
        </div>
      </body>
    </html>
  );
}
