"use client";
import { adminTexts } from "@/HebrewStrings/Texts";
import { useState } from "react";
import Course from "./Course";

const AddCourse = () => {
  const [isAddPressed, setIsAddPressed] = useState<boolean>(false);

  return (
    <div>
      {!isAddPressed ? (
        <>
          <button onClick={() => setIsAddPressed(true)}>
            {adminTexts.adminAddCourse}
          </button>
        </>
      ) : (
        <>
          <Course />
        </>
      )}
    </div>
  );
};

export default AddCourse;
