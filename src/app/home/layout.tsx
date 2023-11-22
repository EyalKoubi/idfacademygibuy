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
  const {user,setUser}=useUserStore()

  useEffect(()=>{
     
  },
  [])
  return (
    <html>
      <body className={inter.className}>
        <div>
          <Navbar />
          <div className="flex justify-end">
            {children}
            {user&&<Sidebar userType={user?.role} />}
          </div>
        </div>
      </body>
    </html>
  );
}
