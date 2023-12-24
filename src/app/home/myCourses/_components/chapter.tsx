import React from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import from next/navigation
import { ChapterData } from '@/app/types';

interface ChapterProps {
  courseid: string;
  chapter: ChapterData;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, courseid }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const navigateToChapter = (chapterId: string, courseid: string) => {
    const newPath = `${currentPath}/${chapterId}/subjects`;
    router.push(newPath);
  };

  return (
    <p onClick={() => navigateToChapter(chapter.id, courseid)} >
      {chapter.name}
       {/* {chapter.brief} */}
    </p>
  );
};

export default Chapter;
