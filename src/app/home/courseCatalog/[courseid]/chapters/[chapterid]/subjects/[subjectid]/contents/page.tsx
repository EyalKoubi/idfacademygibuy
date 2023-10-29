"use client"
import React, { useState } from 'react';
import MediaViewer from './_components/mediaViewer';
import VideoLinkList from './_components/videoLinkList';
import { ContentData } from '@/app/types/types';
import useCoursesStore from '@/app/_contexts/courseContext';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const Contents: React.FC = () => {
   
    const { courses } = useCoursesStore();
    const subjectId= usePathname().split("/")[usePathname().split("/").length - 2];
    const chapterId = usePathname().split("/")[usePathname().split("/").length - 4];
    const courseId = usePathname().split("/")[usePathname().split("/").length - 6];
    console.log(courseId);
    // Find the course with the specified ID
    const courseToPresent = courses.find((course) => course.id === courseId);
  
    // Get the subjects for the selected course, or an empty array if the course is not found
    const contentsToPresent = courseToPresent?.chapters?.find((chapter)=>chapter.id===chapterId)?.subjects.find((subject)=>subject.id===subjectId)?.contents;
    const [currentVideo, setCurrentVideo] = useState(
        `http://localhost:3000/api/getFile?fileName=${contentsToPresent?.[0]?.id || ''}`
      );
      const [currContent, setCurrContent] = useState(
       contentsToPresent?.[0]
      );  
      const handleVideoUpdate = async (content:ContentData) => {
        const formData = new FormData();
        formData.append("fileName",content.id);

        try {
            const response = await axios.post("/api/getFile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // Handle the response as needed
        } catch (error) {
            console.error("Error in API call:", error);
        }
    };

    const onVideoSelect = (url:string, content:ContentData) => {
        setCurrentVideo(url);
        setCurrContent(content);
        handleVideoUpdate(content); // Call the API with the content data
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                <MediaViewer content={currContent} fileUrl={currentVideo} />
            </div>
            <div style={{ flex: 1 }}>
                <VideoLinkList contents={contentsToPresent} onVideoSelect={onVideoSelect} />
            </div>
        </div>
    );
};






export default Contents;
