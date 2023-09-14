"use client";
import { adminTexts } from "@/HebrewStrings/Texts";
import { adminAndUserStyles } from "../../../utils/styles";
import { useSession } from "next-auth/react";

export default function MainCreatorPage() {
  const { data: sessionData } = useSession();

  return (
    <div className={adminAndUserStyles.flexcentercol}>
      <h1 className={adminAndUserStyles.editorTitle}>
        {`${sessionData?.user.name} ${adminTexts.adminWelcome}`}
      </h1>
      <div className={adminAndUserStyles.flexcenterrow}>
        <button className={adminAndUserStyles.btn}>
          {adminTexts.adminCreateQuis}
        </button>
        <button className={adminAndUserStyles.btn}>
          {adminTexts.adminCreateContent}
        </button>
      </div>
    </div>
  );
}
