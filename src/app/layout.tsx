"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/app/_trpc/Provider";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./home/_component/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <SessionProvider>
          <Provider>
            {/* <div className="flex justify-end"> */}
            {children}
            {/* <Sidebar />
            </div> */}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
