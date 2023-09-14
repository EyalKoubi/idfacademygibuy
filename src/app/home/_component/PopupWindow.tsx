import { HomeTexts } from "@/HebrewStrings/Texts";
import { Dispatch, SetStateAction } from "react";

interface PopupWindowProps {
  setIsPopupMessagePressed: Dispatch<SetStateAction<boolean>>;
}

const PopupWindow = ({ setIsPopupMessagePressed }: PopupWindowProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 bg-transparent border-none cursor-pointer text-xl"
          onClick={() => setIsPopupMessagePressed(false)}
        >
          X
        </button>
        <h2>{HomeTexts.mercasHadigitech}</h2>
        <p>{HomeTexts.aboutUs}</p>
      </div>
    </div>
  );
};

export default PopupWindow;
