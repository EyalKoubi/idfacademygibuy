import { HomeTexts } from "@/HebrewStrings/Texts";

const PopupWindow = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <h2>{HomeTexts.mercasHadigitech}</h2>
        <p>{HomeTexts.aboutUs}</p>
      </div>
    </div>
  );
};

export default PopupWindow;
