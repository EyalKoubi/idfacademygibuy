import HamburgerMenu from "./icons/HamburgerMenu";
import { HomeTexts } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import tikshuvPicture from "../../../assets/tikshuv.png";
import Image from "next/image";

const Navbar = () => {
  const {
    isMenuButtonPressed,
    setIsMenuButtonPressed,
    setIsPopupMessagePressed,
  } = useAppState();
  return (
    <header className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <Image src={tikshuvPicture} alt="Tikshuv" width={35} height={0.5} />
          <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
        </div>
        <button onClick={() => setIsPopupMessagePressed(true)}>
          {HomeTexts.mercasHadigitech}
        </button>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Navbar;
