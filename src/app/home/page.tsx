"use client";
import { HomeTexts } from "@/HebrewStrings/Texts";
import PopupWindow from "./_component/PopupWindow";
import useAppState from "../_contexts/globalContext";

const HomePage = () => {
  const { isMenuButtonPressed, isPopupMessagePressed } = useAppState();

  return isPopupMessagePressed ? (
    <PopupWindow />
  ) : (
    <div>
      <h1>{HomeTexts.welcome}</h1>
    </div>
  );
};

export default HomePage;
