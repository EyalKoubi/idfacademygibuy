import React, { useState } from "react";
import Content from "./Content";
import { AddCourseTexts } from "@/HebrewStrings/Texts";

interface SubjectProps {
  subjectData: {
    name: string;
    chapterSummary: string;
  };
}

interface ContentData {
  name: string;
  fileType: string;
  comments: string;
}

const Subject = ({ subjectData }: SubjectProps) => {
  const [contents, setContents] = useState<any[]>([]);
  const [contentData, setContentData] = useState<ContentData>({
    name: "",
    fileType: "text",
    comments: "",
  });

  const handleContentAdd = () => {
    console.log("I am micha");

    setContents([...contents, contentData]);
    setContentData({
      name: "",
      fileType: "text",
      comments: "",
    });
  };

  return (
    <div>
      <h3>{subjectData.name}</h3>
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.subject.contentName}
        value={contentData.name}
        onChange={(e) =>
          setContentData({ ...contentData, name: e.target.value })
        }
      />
      <select
        value={contentData.fileType}
        onChange={(e) =>
          setContentData({ ...contentData, fileType: e.target.value })
        }
      >
        <option value="text">
          {AddCourseTexts.chapter.subject.textContent}
        </option>
        <option value="video">
          {AddCourseTexts.chapter.subject.vidioContent}
        </option>
      </select>
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.subject.comments}
        value={contentData.comments}
        onChange={(e) =>
          setContentData({ ...contentData, comments: e.target.value })
        }
      />
      <form
        action="http://localhost:3000/api/posts"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <button type="submit">
          {AddCourseTexts.chapter.subject.addContent}
        </button>
      </form>
      {contents.map((content, index: React.Key | null | undefined) => (
        <Content key={index} contentData={content} />
      ))}
    </div>
  );
};

export default Subject;
