"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { SubjectData } from "../../courseCreation/types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";

interface SubjectProps {
  subject: SubjectData;
  chapterId: string;
  courseId: string;
}

const Subject = ({ subject, chapterId, courseId }: SubjectProps) => {
  const { deleteSubject, updateSubject } = useCoursesStore();
  const [isSelectedSubject, setIsSelectedSubject] = useState(false);
  const [subjectName, setSubjectName] = useState(subject.name);
  const [isRenameSubject, setIsRenameSubject] = useState(false);

  const handleDeleteSubject = async () => {
    const formData = new FormData();
    formData.append("subjectId", subject.id);
    await axios.post("/api/deleteSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deleteSubject(subject, chapterId, courseId);
  };

  const handleRenameSubject = async () => {
    const formData = new FormData();
    formData.append(
      "subjectRename",
      JSON.stringify({ id: subject.id, name: subjectName })
    );
    await axios.post("/api/renameSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const renamedSubject = {
      id: subject.id,
      name: subjectName,
      contents: subject.contents,
    };
    updateSubject(renamedSubject, chapterId, courseId);
    setIsRenameSubject(false);
  };

  return (
    <div key={subject.name} className="p-4 bg-gray-300 rounded shadow mb-3">
      <span className="text-lg font-medium">{subject.name}</span>

      {isRenameSubject ? (
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
        </div>
      ) : (
        <div className="flex fles-row">
          <button
            onClick={handleDeleteSubject}
            className="p-2 ml-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteSubject}
          </button>
          <button
            onClick={() => setIsRenameSubject(true)}
            className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.rename}
          </button>
          <button
            onClick={() => setIsSelectedSubject(true)}
            className="p-2 ml-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {editTexts.contents}
          </button>
        </div>
      )}

      {isSelectedSubject && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h4 className="text-lg mb-4">{editTexts.contents}</h4>
          <div className="space-y-2">
            {subject.contents.map((content) => (
              <div key={content.name} className="p-2 bg-gray-100 rounded">
                <span className="text-md">{content.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
