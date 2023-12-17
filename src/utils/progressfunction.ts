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
export const findFirstUnwatched = (course: CourseData,router:any,coursesProgress:UserCourseProgress[]): void => {
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
        console.log(currentContentProgress?.contents)
        const isWatched = currentContentProgress?.contents.some(c => c.contentId === content.id && c.watched);
        if (!isWatched) {
          console.log("reach to content not watch",content.id)
          firstUnwatchedChapterId = chapter.id;
          firstUnwatchedSubjectId = subject.id;
          firstUnwatchedContentId = content.id;
          router.push(`/home/myCourses/${course.id}/chapters/${firstUnwatchedChapterId}/subjects/${firstUnwatchedSubjectId}/contents/${firstUnwatchedContentId}`);

           // console.log("meesage from findFirstUnwatched func:dont have content yet for the course that you register")
          
          break outerLoop; // Break out of all loops
        }
        }
      }
    }
    console.log("you finish the course ")
  }
 export function updateContentProgress(updatedContentProgress:ContentProgress[], subjectId:string, chapterId:string,contentId:string) {
    let found = false;

    for (let i = 0; i < updatedContentProgress.length; i++) {
        if (updatedContentProgress[i].subjectId === subjectId && updatedContentProgress[i].chapterId === chapterId) {
            // If content array does not exist, initialize it
            if (!updatedContentProgress[i].contents) {
                updatedContentProgress[i].contents = [];
            }

            // Add new content object
            updatedContentProgress[i].contents.push({ contentId, watched: true });
            found = true;
            break;
        }
    }

    // If no matching subjectId and chapterId were found, add a new element
    if (!found) {
        updatedContentProgress.push({
            subjectId: subjectId,
            chapterId: chapterId,
            contents: [{ contentId, watched: true }]
        });
    }
}

export function calculateProgress (course:CourseData,contentProgress:ContentProgress[]|undefined)  {
  // Replace this logic with your own progress calculation
  let courseContentNum=0,completedCourseContentNum=0;
  for(let chapter of course.chapters){
    for (let subject of chapter.subjects){
      courseContentNum+=subject.contents.length;
    }
  }
  if(contentProgress){
  for(let cp of contentProgress){
    completedCourseContentNum+=cp.contents.length;
    }
  }

 return ((completedCourseContentNum/courseContentNum)*100)
}

