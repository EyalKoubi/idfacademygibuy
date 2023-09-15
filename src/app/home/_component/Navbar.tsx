import HamburgerMenu from "./HamburgerMenu";
import { HomeTexts } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";

const Navbar = () => {
  const {
    isMenuButtonPressed,
    setIsMenuButtonPressed,
    setIsPopupMessagePressed,
  } = useAppState();
  return (
    <header className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
        <button onClick={() => setIsPopupMessagePressed(true)}>
          {HomeTexts.mercasHadigitech}
        </button>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Navbar;
