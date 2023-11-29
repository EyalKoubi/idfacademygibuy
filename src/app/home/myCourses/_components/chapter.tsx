import React from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import from next/navigation
import { ChapterData } from '@/app/types';

interface ChapterProps {
  courseid: string;
  chapter: ChapterData;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, courseid }) => {
  const router = useRouter();
  const currentPath = usePathname(); // Use usePathname to get the current path

  const navigateToChapter = (chapterId: string, courseid: string) => {
    // Construct the new path by appending the chapterId and '/subjects' to the current path
    const newPath = `${currentPath}/${chapterId}/subjects`;

    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <p onClick={() => navigateToChapter(chapter.id, courseid)} style={{ cursor: 'pointer' }}>
      {chapter.name}
       {/* {chapter.brief} */}
    </p>
  );
};

export default Chapter;
