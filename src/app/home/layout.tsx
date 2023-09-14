"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./_component/SideBar";
import Navbar from "./_component/Navbar";
import { SetStateAction, useState } from "react";
import PopupWindow from "./_component/PopupWindow";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuButtonPressed, setIsMenuButtonPressed] =
    useState<boolean>(false);
  const [isPopupMessagePressed, setIsPopupMessagePressed] =
    useState<boolean>(false);
  return (
    <html>
      <body className={inter.className}>
        {isPopupMessagePressed ? (
          <PopupWindow setIsPopupMessagePressed={setIsPopupMessagePressed} />
        ) : (
          <div>
            <Navbar
              isMenuButtonPressed={isMenuButtonPressed}
              setIsMenuButtonPressed={setIsMenuButtonPressed}
              setIsPopupMessagePressed={setIsPopupMessagePressed}
            />
            <div className="flex justify-end">
              {children}
              {isMenuButtonPressed && (
                <Sidebar setIsPopupMessagePressed={setIsPopupMessagePressed} />
              )}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
