"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../_components/Globals/SideBar";
import Navbar from "../_components/Globals/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Navbar />
        <div className="flex justify-end">
          {children}
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
