import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData } from "../../../types/types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";

interface ContentProps {
  content: ContentData;
  subjectId: string;
  chapterId: string;
  courseId: string;
}

const Content:React.FC<ContentProps> = ({ content, chapterId, subjectId, courseId }: ContentProps) => {
  const { deleteContent, updateComments } = useCoursesStore();
  const [isChangeCommentsContentPressed, setIsChangeCommentsContentPressed] =
    useState(false);
  const [comments, setComments] = useState(content.comments);
  const [renameContentError,setRenameContentError]=useState("")

  const handleDeleteContent = async () => {
    const formData: any = new FormData();
    formData.append("contentId", content.id);
    await axios.post("/api/deleteContent", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deleteContent(content, subjectId, chapterId, courseId);
  };

  const handleChangeComments = async () => {
    const formData: any = new FormData();
    const editCommentsProps = { contentId: content.id, comments: comments };
    formData.append("editCommentsProps", JSON.stringify(editCommentsProps));
    console.log(editCommentsProps)
    console.log(
      "🚀 ~ file: Content.tsx:33 ~ handleChangeComments ~ editCommentsProps:",
      editCommentsProps
    );
    const response =await axios.post("/api/editComments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.data?.message){
      setRenameContentError(response.data?.message)
    }
    else{
    updateComments(
      { id: content.id, file_name: content.file_name, comments: comments },
      subjectId,
      chapterId,
      courseId
    );
    setIsChangeCommentsContentPressed(false);
    }
  };
  return (
    <div className="p-2 bg-gray-100 rounded flex flex-col">
      <span className="text-md">{content.file_name}</span>
      <span className="text-md">
        {editTexts.comments} : {content.comments}
      </span>
      {isChangeCommentsContentPressed ? (
        <div className="flex items-center ml-1">
          <input
            type="text"
            placeholder={editTexts.subjectName}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleChangeComments}
            className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {GeneralTexts.submit}
           
          </button>
          <div>
          {renameContentError && (
                  <div className="text-red-500">
                    {renameContentError}
                  </div>
                )}
            </div>
        </div>
      ) : (
        <div className="flex fles-row">
          <button
            onClick={handleDeleteContent}
            className="p-2 ml-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteContent}
          </button>
          <button
            onClick={() => setIsChangeCommentsContentPressed(true)}
            className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.rename}
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
