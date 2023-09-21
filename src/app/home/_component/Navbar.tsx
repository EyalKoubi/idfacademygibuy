import HamburgerMenu from "./icons/HamburgerMenu";
import { HomeTexts } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import tikshuvPicture from "../../../assets/tikshuv.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex">
          <Image src={tikshuvPicture} alt="Tikshuv" width={35} height={0.5} />
          <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
        </div>
        <button
          onClick={() => {
            router.push("/home/aboutUs");
          }}
        >
          {HomeTexts.mercasHadigitech}
        </button>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Navbar;
