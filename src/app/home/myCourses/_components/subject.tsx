
import { ChapterData, SubjectData } from '@/app/types';
import { usePathname,useRouter } from 'next/navigation';

import React, { ReactNode } from 'react';

interface SubjectProps {
    subject:SubjectData;
    courseid:string;
    chapterid:string;
}

const Subject: React.FC<SubjectProps> = ({subject,courseid,chapterid}) => {
  const currpath=usePathname();
  const router=useRouter();
  const navigateToChapter = (subjectId: string,currpath:string) => {
    router.push(currpath+`/${subjectId}/contents/${subject.contents[0].id}`);
   };
  return (
    <p  onClick={() => navigateToChapter(subject.id,currpath)}>
      {subject.name}
    </p>
  );
};

export default Subject;