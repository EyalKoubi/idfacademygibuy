"use client"
import React, { useEffect, useState } from 'react';
import MediaViewer from './_components/mediaViewer';
import VideoLinkList from './_components/videoLinkList';
import useCoursesStore from '@/app/_contexts/courseContext';
import { usePathname } from 'next/navigation';
import { ContentData } from '@/app/types/types';
import axios from 'axios';

const Contents: React.FC = () => {
    const { courses } = useCoursesStore();
    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    const subjectId = pathSegments[pathSegments.length - 2];
    const chapterId = pathSegments[pathSegments.length - 4];
    const courseId = pathSegments[pathSegments.length - 6];

    const courseToPresent = courses.find(course => course.id === courseId);
    const contentsToPresent = courseToPresent?.chapters?.find(chapter => chapter.id === chapterId)?.subjects.find(subject => subject.id === subjectId)?.contents;

    const [currContent, setCurrContent] = useState<ContentData | undefined>(contentsToPresent?.[0]);

    useEffect(() => {
        const fetchMedia = async () => {
          try {
            // const response = await axios.get(`/api/getFile`);
            // console.log(response.data)
        //     const url = URL.createObjectURL(response.data);
        //     setMediaSrc(url);
        //     setLoading(false);
         } catch (error) {
        //     console.error('Error fetching media:', error);
        //     setError('Failed to load media.');
        //     setLoading(false);
          }
        };
    
        fetchMedia();
      }, []);
    const onVideoSelect = (content: ContentData) => {
        setCurrContent(content);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                {currContent && <MediaViewer content={currContent} />}
            </div>
            <div style={{ flex: 1 }}>
                <VideoLinkList contents={contentsToPresent} onVideoSelect={onVideoSelect} />
            </div>
        </div>
    );
};

export default Contents;
