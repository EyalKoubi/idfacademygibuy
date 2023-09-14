import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { Dispatch, SetStateAction } from "react";
import Sidebar from "./SideBar";
import { HomeTexts } from "@/HebrewStrings/Texts";

interface NavbarProps {
  setIsMenuButtonPressed: Dispatch<SetStateAction<boolean>>;
  isMenuButtonPressed: boolean;
  setIsPopupMessagePressed: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({
  isMenuButtonPressed,
  setIsMenuButtonPressed,
  setIsPopupMessagePressed,
}: NavbarProps) => {
  return (
    <header className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
        <button onClick={() => setIsPopupMessagePressed(true)}>
          {HomeTexts.mercasHadigitech}
        </button>
        <HamburgerMenu
          isMenuButtonPressed={isMenuButtonPressed}
          setIsMenuButtonPressed={setIsMenuButtonPressed}
        />
      </div>
    </header>
  );
};

export default Navbar;
