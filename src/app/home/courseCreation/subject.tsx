import React, { useEffect, useState } from "react";
import Content from "./_components/Content";
import { AddCourseTexts } from "@/HebrewStrings/Texts";
import axios from "axios";

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
  const [content, setContent] = useState<File | null>(null);
  const [contentData, setContentData] = useState<ContentData>({
    name: "",
    fileType: "text",
    comments: "",
  });

  const handleContentAdd = async () => {
    try {
      console.log(
        "🚀 ~ file: Subject.tsx:93 ~ Subject ~ content:",
        content
      );

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify(content), // Use the FormData object here
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          "🚀 ~ file: .tsx:45 ~ handleContentAdd ~ data.message:",
          data.message
        );
      }
      // const response = await axios.post("http://localhost:3000/api/posts/", {
      //   message: "dsjhfisdauh",
      // });
      // console.log(await response.json());
      // const data = await response.data.json();
      //console.log("🚀 ~ file: Subject.tsx:47 ~ handleContentAdd ~ data:", data);

      // Handle the response here if needed
      // console.log("Response from server:", response.data.message);
      // console.log(
      //   "🚀 ~ file: Subject.tsx:43 ~ handleContentAdd ~ response.data:",
      //   response.data
      // );

      // Clear the form or update the UI as needed
      // setContent(null);
      // setContentData({
      //   name: "",
      //   fileType: "text",
      //   comments: "",
      // });
    } catch (error) {
      console.error("Error adding content:", error);
    }
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
        onChange={(e) => {
          setContentData({ ...contentData, fileType: e.target.value });
        }}
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
      <div>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files) setContent(e.target.files[0]);
          }}
        />
        <button onClick={handleContentAdd}>
          {AddCourseTexts.chapter.subject.addContent}
        </button>
      </div>
      {contents.map((content, index: React.Key | null | undefined) => (
        <Content key={index} contentData={content} />
      ))}
    </div>
  );
};

export default Subject;