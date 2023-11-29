import React from "react";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";

interface UpdateChapterFormProps {
  chapterName: string;
  setChapterName: (name: string) => void;
  chapterBrief: string;
  setChapterBrief: (brief: string) => void;
  handleUpdateChapter: () => void;
  renameChapterError: string | null;
}

const UpdateChapterForm: React.FC<UpdateChapterFormProps> = ({
  chapterName,
  setChapterName,
  chapterBrief,
  setChapterBrief,
  handleUpdateChapter,
  renameChapterError,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder={editTexts.chapterName}
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
        className="p-2 ml-4 border rounded"
      />
      <input
        type="text"
        placeholder={editTexts.chapterBrief}
        value={chapterBrief}
        onChange={(e) => setChapterBrief(e.target.value)}
        className="p-2 ml-2 border rounded"
      />
      <button
        onClick={handleUpdateChapter}
        className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        {GeneralTexts.submit}
      </button>
      {renameChapterError && <div className="text-red-500">{renameChapterError}</div>}
    </>
  );
};

export default UpdateChapterForm;
