import useUserStore from '@/app/_contexts/userContext';
import { CourseData, UserCourseProgress,ChapterData,ContentProgress, ContentItemProgress } from '@/app/types'

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
export const findFirstUnwatched = (course: CourseData): UserCourseProgress => {
  let firstUnwatchedChapterId = '';
  let firstUnwatchedSubjectId = '';
  const {coursesProgress}=useUserStore()
    const coursesProcessById=coursesProgress.find(courseprogress=>courseprogress.courseId===course.id)
  for (const chapter of course.chapters) {
    for (const subject of chapter.subjects) {
        const unwatchedContent = subject.contents.find(content => {
            const contentProgress = coursesProcessById?.contentProgress.find(cp => cp.chapterId === chapter.id)?.contents.find(c => c.contentId === content.id);
            return !contentProgress?.watched;
          });
      if (unwatchedContent) {
        firstUnwatchedChapterId = chapter.id;
        firstUnwatchedSubjectId = subject.id;
        break;
      }
    }
    if (firstUnwatchedChapterId) break;
  }

  return {
    courseId: course.id,
    lastChapterId: firstUnwatchedChapterId,
    lastSubjectId: firstUnwatchedSubjectId,
    contentProgress: coursesProcessById?.contentProgress
  };
};
