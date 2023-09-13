"use client";
import { useSession } from "next-auth/react";
import { adminAndUserStyles } from "../../../utils/styles";
import { UserTexts } from "@/HebrewStrings/Texts";

export default function MainUserPage() {
  const { data: sessionData } = useSession();

  return (
    <div className={adminAndUserStyles.flexcentercol}>
      <h1 className={adminAndUserStyles.editorTitle}>
        {`${sessionData?.user.name} ${UserTexts.userWelcome}`}
      </h1>
      <div className={adminAndUserStyles.flexcenterrow}>
        <button className={adminAndUserStyles.btn}>{UserTexts.userQuis}</button>
        <button className={adminAndUserStyles.btn}>
          {UserTexts.userContent}
        </button>
      </div>
    </div>
  );
}
