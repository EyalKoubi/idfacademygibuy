import React from "react";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";

interface RenameSubjectFormProps {
  subjectName: string;
  setSubjectName: (name: string) => void;
  handleRenameSubject: () => void;
  renameSubjectError: string | null;
}

const RenameSubjectForm: React.FC<RenameSubjectFormProps> = ({
  subjectName,
  setSubjectName,
  handleRenameSubject,
  renameSubjectError,
}) => {
  return (
    <div className="flex items-center ml-1">
      <input
        type="text"
        placeholder={editTexts.subjectName}
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleRenameSubject}
        className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        {GeneralTexts.submit}
      </button>
      {renameSubjectError && <div className="text-red-500">{renameSubjectError}</div>}
    </div>
  );
};

export default RenameSubjectForm;
