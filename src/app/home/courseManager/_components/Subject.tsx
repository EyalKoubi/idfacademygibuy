"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData, SubjectData } from "../../../types/types";
import { FormEvent, useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import Content from "./Content";

interface SubjectProps {
  subject: SubjectData;
  chapterId: string;
  courseId: string;
}

const Subject = ({ subject, chapterId, courseId }: SubjectProps) => {
  const { deleteSubject, updateSubject, addContent, courses } =
    useCoursesStore();
  const [isSelectedSubject, setIsSelectedSubject] = useState(false);
  const [subjectName, setSubjectName] = useState(subject.name);
  const [isRenameSubject, setIsRenameSubject] = useState(false);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [contentData, setContentData] = useState<ContentData>({
    id: "",
    file_name: "",
    comments: "",
  });
  const [file, setFile] = useState<any | null>(null);

  const handleDeleteSubject = async () => {
    const formData = new FormData();
    formData.append("subjectId", subject.id);
    const response = await axios.post("/api/deleteSubject", formData, {
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

  const submitFile = async (event: FormEvent) => {
    event?.preventDefault();
    if (!file) return;
    const formData: any = new FormData();
    formData.append("file", file, file.name);
    formData.append("bucket", courseId);
    formData.append("comments", contentData.comments);
    formData.append("subjectId", subject.id);
    console.log(formData);

    try {
      console.log(file);
      const response = await axios.post("/api/addContent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newCont = response.data;
      setIsAddingContent(false);

      addContent(courseId, chapterId, subject.id, newCont);
    } catch (error) {
      console.log("🚀 ~ file: Subject.tsx:38 ~ submitFile ~ error:", error);
    }
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
            {subject.contents?.map((content) => (
              <Content
                key={content.id}
                content={content}
                subjectId={subject.id}
                chapterId={chapterId}
                courseId={courseId}
              />
            ))}
            {isAddingContent ? (
              <div>
                <input
                  type="text"
                  placeholder={editTexts.comments}
                  value={contentData.comments}
                  onChange={(e) =>
                    setContentData({ ...contentData, comments: e.target.value })
                  }
                  className="p-2 w-full border rounded-md shadow-sm mb-4"
                />
                <form onSubmit={submitFile} className="flex flex-col space-y-4">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0)
                        setFile(e.target.files[0]);
                    }}
                    className="p-2 border rounded-md shadow-sm"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-green-600 text-white rounded-md hover:bg-green-800 shadow-sm"
                  >
                    {GeneralTexts.submit}
                  </button>
                </form>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingContent(true)}
                className="bg-purple-500 text-white w-12 h-12 rounded-full hover:bg-purple-700 active:scale-90 transition transform"
                aria-label="Add"
              >
                <svg
                  className="w-6 h-6 mx-auto my-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
