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
    <div key={subject.name}>
      <span>{subject.name}</span>
      <button onClick={handleDeleteSubject}>{editTexts.deleteSubject}</button>
      <button onClick={handleRenameSubject}></button>
      {isRenameSubject ? (
        <div>
          <input
            type="text"
            placeholder={editTexts.subjectName}
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <button onClick={handleRenameSubject}>{GeneralTexts.submit}</button>
        </div>
      ) : (
        <button onClick={() => setIsRenameSubject(true)}>
          {editTexts.rename}
        </button>
      )}
      <button onClick={() => setIsSelectedSubject(true)}>
        {editTexts.contents}
      </button>

      {isSelectedSubject && (
        <div>
          <h4>{editTexts.contents}</h4>
          {subject.contents.map((content) => (
            <div key={content.name}>
              <span>{content.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subject;
