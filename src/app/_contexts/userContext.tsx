import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState,UserCourseProgress} from "@/app/types";





type CoursesActions = {
  setUser: (user: any) => void;
  setUserCourses: (courses: CourseData[]) => void;
  addUserCourse:(course:CourseData)=>void;
  setAdminCourses: (courses: CourseData[]) => void;
  setCourseProgress: (coursesProgress: UserCourseProgress[])=>void;
  addAdminCourse:(course:CourseData)=>void;
  updateCourseProgress: (courseProgress: UserCourseProgress) => void;
  markContentAsWatched: (courseId: string, chapterId: string, subjectId: string, contentId: string) => void;
  isChapterFullyWatched :(state: UserState, courseId: string, chapterId: string)=>boolean;
}
const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  userCourses: [],
  adminCourses: [],
  courseProgress: [],

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
    state.courseProgress = coursesProgress;
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

  updateCourseProgress: (courseProgress: UserCourseProgress) => set((state) => {
    const index = state.courseProgress.findIndex(cp => cp.courseId === courseProgress.courseId);
    if (index >= 0) {
      state.courseProgress[index] = courseProgress;
    } else {
      state.courseProgress.push(courseProgress);
    }
    return { ...state };
  }),
  markContentAsWatched: (courseId: string, chapterId: string, subjectId: string, contentId: string) => set((state) => {
    const courseProgressIndex = state.courseProgress.findIndex(cp => cp.courseId === courseId);
  
    if (courseProgressIndex >= 0) {
      // Find the chapter progress index
      const chapterProgressIndex = state.courseProgress[courseProgressIndex].contentProgress.findIndex(cp => cp.chapterId === chapterId);
  
      if (chapterProgressIndex >= 0) {
        // Find the subject within the chapter
        if (state.courseProgress[courseProgressIndex].contentProgress[chapterProgressIndex].subjectId === subjectId) {
          const contentIndex = state.courseProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents.findIndex(c => c.contentId === contentId);
          
          if (contentIndex >= 0) {
            // Update the watched status of the content item
            state.courseProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents[contentIndex].watched = true;
          } else {
            // If the content item is not found, add it as watched
            state.courseProgress[courseProgressIndex].contentProgress[chapterProgressIndex].contents.push({ contentId, watched: true });
          }
        } else {
          // If no progress exists for this subject in the chapter, create a new entry
          state.courseProgress[courseProgressIndex].contentProgress[chapterProgressIndex] = {
            chapterId,
            subjectId,
            contents: [{ contentId, watched: true }]
          };
        }
      } else {
        // If no progress exists for this chapter, create a new entry
        state.courseProgress[courseProgressIndex].contentProgress.push({
          chapterId,
          subjectId,
          contents: [{ contentId, watched: true }]
        });
      }
    } else {
      // If no progress exists for this course, create a new entry
      state.courseProgress.push({
        courseId,
        lastChapterId: chapterId,
        lastSubjectId: subjectId,
        contentProgress: [{
          chapterId,
          subjectId,
          contents: [{ contentId, watched: true }]
        }]
      });
    }
    
    return { ...state };
  }),
   isChapterFullyWatched :(state: UserState, courseId: string, chapterId: string): boolean => {
    const course = state.courseProgress.find(c => c.courseId === courseId);
    if (!course) return false;

    const chapterProgress = course.contentProgress.find(cp => cp.chapterId === chapterId);
    if (!chapterProgress) return false;

    return chapterProgress.contents.every(content => content.watched);
  },

}))


export default useUserStore;

