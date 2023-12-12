import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState,UserCourseProgress, ContentItemProgress} from "@/app/types";
import {createInitialContentProgress} from '@/utils/progressfunction'




type CoursesActions = {
  setUser: (user: any) => void;
  setUserCourses: (courses: CourseData[]) => void;
  addUserCourse:(course:CourseData)=>void;
  setAdminCourses: (courses: CourseData[]) => void;
  deleteCourseFromUser: (course:CourseData)=>void;
  addNewCourseProcess: (course: CourseData) => void;
  setCourseProgress: (coursesProgress: UserCourseProgress[])=>void;
  addAdminCourse:(course:CourseData)=>void;
  markContentAsWatched: (courseId: string, chapterId: string, subjectId: string, contentId: string) => void;
  ContentsSubjectStatus: (state:UserState & CoursesActions, courseId: string, chapterId: string, subjectId: string)=> ContentItemProgress[]|undefined;
}
const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  userCourses: [],
  adminCourses: [],
  coursesProgress: [],

  setUser: (user: any) => set((state) => {
    state.user = user;
    return { ...state };
  }),

  setUserCourses: (courses: CourseData[]) => set((state) => {
    state.userCourses = courses;
    return { ...state };
  }),
    setAdminCourses: (courses: CourseData[]) => set((state) => {
    state.adminCourses = courses;
    return { ...state };
  }),
  setCourseProgress: (coursesProgress: UserCourseProgress[]) => set((state) => {
    state.coursesProgress = coursesProgress;
    return { ...state };
  }),
  addUserCourse: (course: CourseData) => set((state) => ({
    ...state,
    userCourses: [...state.userCourses, course],
  })),
 
  addAdminCourse: (course: CourseData) => set((state) => ({
    ...state,
    adminCourses: [...state.adminCourses, course],
  })),
  deleteCourseFromUser: (course: CourseData) => set((state) => {
    // Delete from userCourses
    const newUserCourses = state.userCourses.filter(
      (curCourse) => course.id !== curCourse.id
    );

    // Delete from adminCourses
    const newAdminCourses = state.adminCourses.filter(
      (curCourse) => course.id !== curCourse.id
    );

    // Delete from coursesProgress
    const newCoursesProgress = state.coursesProgress.filter(
      (courseProgress) => course.id !== courseProgress.courseId
    );

    return { 
      ...state, 
      userCourses: newUserCourses,
      adminCourses: newAdminCourses,
      coursesProgress: newCoursesProgress 
    };
}),

  addNewCourseProcess: (course: CourseData) => set((state) => ({
    ...state,
    coursesProgress: [...state.coursesProgress, {courseId: course.id,
      lastChapterId: '',
      lastSubjectId:'' ,
      firstUnwatchedContentId:'',
      contentProgress: []}],
  })),

  
  markContentAsWatched: (courseId: string, chapterId: string, subjectId: string, contentId: string) => set((state) => {
    const courseProgressIndex = state.coursesProgress.findIndex(cp => cp.courseId === courseId);
  
    if (courseProgressIndex >= 0) {
      // Find the chapter progress index
      const chapterProgressIndex = state.coursesProgress[courseProgressIndex].contentProgress.findIndex(cp => cp.chapterId === chapterId);
  
      if (chapterProgressIndex >= 0) {
        // Find the subject within the chapter
        if (state.coursesProgress[courseProgressIndex].contentProgress[chapterProgressIndex].subjectId === subjectId) {
          const contentIndex = state.coursesProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents.findIndex(c => c.contentId === contentId);
  
          if (contentIndex >= 0) {
            // Update the watched status of the content item
            state.coursesProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents[contentIndex].watched = true;
          } else {
            // If the content item is not found, add it as watched
            state.coursesProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents.push({ contentId, watched: true });
          }
        } else {
          // If no progress exists for this subject in the chapter, create a new entry
          state.coursesProgress[courseProgressIndex].contentProgress[chapterProgressIndex] = {
            chapterId,
            subjectId,
            contents: [{ contentId, watched: true }]
          };
        }
      } else {
        // If no progress exists for this chapter, create a new entry
        state.coursesProgress[courseProgressIndex].contentProgress.push({
          chapterId,
          subjectId,
          contents: [{ contentId, watched: true }]
        });
      }
  
      // Logic to find next unwatched content
      let nextUnwatchedContentId = '';
      for (const chapter of state.coursesProgress[courseProgressIndex].contentProgress) {
        for (const content of chapter.contents) {
          if (!content.watched) {
            nextUnwatchedContentId = content.contentId;
            break;
          }
        }
        if (nextUnwatchedContentId) break;
      }
  
      // Update firstUnwatchedContentId
      state.coursesProgress[courseProgressIndex].firstUnwatchedContentId = nextUnwatchedContentId;
    } else {
      // If no progress exists for this course, create a new entry
      state.coursesProgress.push({
        courseId,
        lastChapterId: chapterId,
        lastSubjectId: subjectId,
        firstUnwatchedContentId: '', // Set to empty as this is a new course entry
        contentProgress: [{
          chapterId,
          subjectId,
          contents: [{ contentId, watched: true }]
        }]
      });
    }
  
    return { ...state };
  }),
  
  ContentsSubjectStatus: (state: UserState, courseId: string, chapterId: string, subjectId: string): ContentItemProgress[]|undefined => {
    // Find the course progress for the given courseId
    const courseProgress = state.coursesProgress.find(c => c.courseId === courseId);
    if (!courseProgress) return undefined;
  
    // Find the chapter progress for the given chapterId
    const chapterSubjectProgress = courseProgress.contentProgress.find(cp =>( cp.chapterId === chapterId&&cp.subjectId===subjectId));
    if (!chapterSubjectProgress) return undefined;
  
    // Find the specific content item by contentId and return its watched status
   return chapterSubjectProgress.contents
  }

}))


export default useUserStore;

