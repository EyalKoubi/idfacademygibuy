"use client";
import { EditorTexts } from "@/HebrewStrings/Texts";
import { adminAndUserStyles } from "../../../utils/styles";
import { useSession } from "next-auth/react";

export default function MainEditorPage() {
  const { data: sessionData } = useSession();

  return (
    <div className={adminAndUserStyles.flexcentercol}>
      <h1 className={adminAndUserStyles.editorTitle}>
        {`${sessionData?.user.name} ${EditorTexts.editorWelcome}`}
      </h1>
      <div className={adminAndUserStyles.flexcenterrow}>
        <button className={adminAndUserStyles.btn}>
          {EditorTexts.editorAddQuis}
        </button>
        <button className={adminAndUserStyles.btn}>
          {EditorTexts.editorAddContent}
        </button>
      </div>
    </div>
  );
}
