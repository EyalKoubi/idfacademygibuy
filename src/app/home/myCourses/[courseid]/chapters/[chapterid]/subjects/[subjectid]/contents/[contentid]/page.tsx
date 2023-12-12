"use client"
import React, { useEffect, useState } from 'react';
import MediaViewer from '@/app/home/_component/mediaViewer';
import VideoLinkList from '../_components/videoLinkList';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ContentData, ContentItemProgress } from '@/app/types';
import useUserStore from '@/app/_contexts/userContext';
import axios from 'axios';

interface ContentListProps {
  params: {
    courseid: string;
    chapterid: string;
    subjectid: string;
    contentid?:string;
  };
}

const ContentList: React.FC<ContentListProps> = ({ params }) => {
  const { courses } = useCoursesStore();
  const {user,coursesProgress,markContentAsWatched,ContentsSubjectStatus } = useUserStore();
  const subjectId = params.subjectid;
  const chapterId = params.chapterid;
  const courseId = params.courseid;

  const courseToPresent = courses.find(course => course.id === courseId);
  const contentsToPresent:ContentData[]|undefined = courseToPresent?.chapters?.find(chapter => chapter.id === chapterId)?.subjects.find(subject => subject.id === subjectId)?.contents;
  console.log(contentsToPresent)
  const userState = useUserStore(); // This is how you access the state

  const contentsStatus:ContentItemProgress[]|undefined =ContentsSubjectStatus(userState,courseId, chapterId, subjectId);
  const [contentIndex, setContentIndex] = useState<number>(0);
  
  const [currContent, setCurrContent] = useState<ContentData | undefined>(contentsToPresent?.find(content=>content.id===params.contentid));
  useEffect(()=>{
    const curContentStatus=contentsStatus?.find(contentstatus=>contentstatus.contentId===currContent?.id)
    if(curContentStatus&&currContent)
      onVideoSelect(currContent,curContentStatus)}
    ,[])


  const onVideoSelect = async(content: ContentData,contentStatus:ContentItemProgress) => {
    console.log('Selected Content:', content);
    // Find the index of the selected content in the contentsToPresent array
    const newIndex = contentsToPresent?.findIndex((c) => c.id === content?.id);
    // Check if a valid index is found
    if (typeof newIndex === 'number' && newIndex >= 0 &&contentsToPresent!==undefined) {
      setContentIndex(newIndex);
      setCurrContent(contentsToPresent[newIndex]);
      if(!contentStatus.watched){ // No optional chaining needed, newIndex is a number
        
        await markContentAsWatched(courseId, chapterId, subjectId, contentsToPresent[newIndex].id);
        try {
          let formData = new FormData();
          formData.append("courseId", courseId);
          formData.append("userId", user.id);
          formData.append("lastChapterId", chapterId); // Assuming lastChapterId is defined
          formData.append("lastSubjectId", subjectId); // Assuming lastSubjectId is defined
          formData.append("firstUnwatchedContentId", contentsToPresent[newIndex].id); // Assuming firstUnwatchedContentId is defined
            // Now retrieve the updated contentProgress from the state
    const updatedContentProgress = coursesProgress.find(courseProgress => courseProgress.courseId === courseId)?.contentProgress;

    // Prepare FormData with the updated state

          formData.append("contentProgress", JSON.stringify(updatedContentProgress));
      
          // Send a POST request to the server
          const response = await axios.post('/api/updateProgressCourse', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          if(!response.data.message)
            console.log('Course progress updated:', response.data);
          else{
            console.log('ERRROR');
          }
      } catch (error) {
          console.error('Error updating course progress:', error);
      }
      
        
        console.log("course process:",coursesProgress)
       } 
    }
  };
  
  const goToNextContent = () => {
    if (contentsToPresent && contentIndex < contentsToPresent.length - 1) {
      setContentIndex(contentIndex + 1);
      setCurrContent(contentsToPresent[contentIndex + 1]);
    }
  };

  const goToPreviousContent = () => {
    if (contentIndex > 0 &&contentsToPresent!==undefined) {
      setContentIndex(contentIndex - 1);
      setCurrContent(contentsToPresent[contentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <h1>תכנים</h1>
      <div className="flex justify-between items-center mb-4"> {/* Added bottom margin */}
        <div className="flex-1 flex justify-center items-center ">
          {currContent ? (
            <div className="flex justify-center items-center" style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'rgba(128, 128, 128, 0.2)',
              borderRadius: '5%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(6, 30, 58, 0.1)',
              overflow: 'hidden',
            }}>
              <MediaViewer content={currContent} />
            </div>
          ) : (
            <div className="text-white">
              No content selected or available
            </div>
          )}
        </div>
        <div className="flex justify-start md:block" style={{width:'150px'}}>
         <VideoLinkList contents={contentsToPresent} onVideoSelect={onVideoSelect} contentsStatus={contentsStatus} />
        </div>
      </div>
  
      <div className="mt-4"> {/* Added top margin */}
        <button onClick={goToPreviousContent} disabled={contentIndex === 0}>
          Previous   
        </button>
        <button onClick={goToNextContent} disabled={!contentsToPresent || contentIndex === contentsToPresent.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
          }  

export default ContentList;
