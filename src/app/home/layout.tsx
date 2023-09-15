"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./_component/SideBar";
import Navbar from "./_component/Navbar";
import PopupWindow from "./_component/PopupWindow";
import useAppState from "../_contexts/globalContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMenuButtonPressed, isPopupMessagePressed } = useAppState();
  return (
    <html>
      <body className={inter.className}>
        {isPopupMessagePressed ? (
          <PopupWindow />
        ) : (
          <div>
            <Navbar />
            <div className="flex justify-end">
              {children}
              {isMenuButtonPressed && <Sidebar />}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
