import useUserStore from '@/app/_contexts/userContext';
import { CourseData, UserCourseProgress,ChapterData,ContentProgress, ContentItemProgress } from '@/app/types'
import { useRouter } from 'next/navigation';

export const createInitialContentProgress = (course: CourseData): ContentProgress[] => {
  return course.chapters.map((chapter:ChapterData )=> ({
    chapterId: chapter.id,
    subjectId: '', // initially empty, will be filled when the first unwatched content is found
    contents: chapter.subjects.flatMap(subject =>
      subject.contents.map(content => ({
        contentId: content.id,
        watched: false
      }))
    )
  }));
};

// Function to find the first chapter with any unwatched content and create content progress
const findFirstUnwatched = (course: CourseData,router:any,coursesProgress:UserCourseProgress[]): void => {
  console.log(course)
  let firstUnwatchedChapterId = '';
  let firstUnwatchedSubjectId = '';
  let firstUnwatchedContentId = '';

  const courseProgressById = coursesProgress?.find(cp => cp.courseId === course.id);

  // Looping through each chapter and subject
  outerLoop:
  for (const chapter of course.chapters) {
    for (const subject of chapter.subjects) {
      // Find the content progress for the current chapter and subject
      const currentContentProgress = courseProgressById?.contentProgress.find(cp => cp.chapterId === chapter.id && cp.subjectId === subject.id);

      // Loop through each content in the subject
      for (const content of subject.contents) {
        // Check if this content is not watched
        const isWatched = currentContentProgress?.contents.some(c => c.contentId === content.id && c.watched);
        if (!isWatched) {
          firstUnwatchedChapterId = chapter.id;
          firstUnwatchedSubjectId = subject.id;
          firstUnwatchedContentId = content.id;
          console.log(firstUnwatchedChapterId ,
            firstUnwatchedSubjectId,
            firstUnwatchedContentId )
          router.push(`/home/myCourses/${course.id}/chapters/${firstUnwatchedChapterId}/subjects/${firstUnwatchedSubjectId}/contents/${firstUnwatchedContentId}`);
          break outerLoop; // Break out of all loops
        }
      }
    }
  }
}

