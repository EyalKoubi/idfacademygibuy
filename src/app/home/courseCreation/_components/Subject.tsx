'use client'
import React, { FormEvent, useEffect, useState } from "react";
import Content from "./Content";
import { AddCourseTexts } from "@/HebrewStrings/Texts";
import axios from "axios";
import { Request } from "express";

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
  const [file, setFile] = useState<any | null>(null);
  const [contentData, setContentData] = useState<ContentData>({
    name: "",
    fileType: "text",
    comments: "",
  });

  const submitFile = async (event: FormEvent) => {
    event?.preventDefault();
    if (!file) return;
    const formData:any = new FormData();
    formData.append("file", file, file.name);
    console.log(formData);
 
   
    try {
      console.log(file)
      const response = await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(
        "🚀 ~ file: Subject.tsx:39 ~ submitFile ~ response.data:",
        response.data
      );
    } catch (error) {
      console.log("🚀 ~ file: Subject.tsx:38 ~ submitFile ~ error:", error);
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
      <form onSubmit={submitFile}>
        <label htmlFor="file">nisuy</label>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0)
              setFile(e.target.files[0]);
          }}
        />
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
