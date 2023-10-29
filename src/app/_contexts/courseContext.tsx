import { create } from "zustand";
import { ContentData } from "../types/types";

type Content = {
  id: string;
  file_name: string;
  comments: string;
};

type Subject = {
  id: string;
  name: string;
  contents: ContentData[];
};

type Chapter = {
  id: string;
  name: string;
  brief: string;
  subjects: Subject[];
};

type Course = {
  id: string;
  name: string;
  chapters: Chapter[];
};

type CoursesState = {
  courses: Course[];
};

type CoursesActions = {
  addCourse: (course: Course) => void;
  addChapter: (courseId: string, chapter: Chapter) => void;
  addSubject: (
    courseId: string,
    chapterIndex: number,
    subject: Subject
  ) => void;
  addContent: (
    courseId: string,
    chapterId: string,
    subjectId: string,
    content: Content
  ) => void;
  deleteCourse: (course: Course) => void;
  deletChapter: (chapter: Chapter, courseId: string) => void;
  deleteSubject: (
    subject: Subject,
    chapterId: string,
    courseId: string
  ) => void;
  deleteContent: (
    content: Content,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) => void;
  renameCourse: (course: Course) => void;
  updateChapter: (chapter: Chapter, courseId: string) => void;
  updateSubject: (
    subject: Subject,
    chapterId: string,
    courseId: string
  ) => void;
  updateComments: (
    content: Content,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) => void;
  setCourseName: (courseId: string, name: string) => void;
  setChapterBrief: (
    courseId: string,
    chapterIndex: number,
    brief: string
  ) => void;
  setCourses: (courses: Course[]) => void;
};

const useCoursesStore = create<CoursesState & CoursesActions>((set) => ({
  courses: [],

  addCourse: (course) =>
    set((state) => ({
      ...state,
      courses: [...state.courses, course],
    })),

  addChapter: (courseId, chapter) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.chapters.push(chapter);
      }
      return { ...state };
    }),

  addSubject: (courseId, chapterIndex, subject) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].subjects.push({
          ...subject,
          contents: [],
        });
      }
      return { ...state };
    }),

  addContent: (
    courseId: string,
    chapterId: string,
    subjectId: string,
    content: Content
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  let newContents = curSubject.contents;
                  newContents.push(content);
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteCourse: (course: Course) =>
    set((state) => {
      state.courses = state.courses.filter(
        (curCourse) => course.id !== curCourse.id
      );
      return { ...state };
    }),

  deletChapter: (chapter: Chapter, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapter = curCourse.chapters.filter(
            (curChapter) => chapter.id !== curChapter.id
          );
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: updatedChapter,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteSubject: (subject: Subject, chapterId: string, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapters = curCourse.chapters.map((curChapter) => {
            if (chapterId === curChapter.id) {
              const updatedSubjects = curChapter.subjects.filter(
                (curSubject) => subject.id !== curSubject.id
              );
              return {
                id: curCourse.id,
                name: curCourse.name,
                brief: curChapter.brief,
                subjects: updatedSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: updatedChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteContent: (
    content: Content,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (curCourse.id === courseId) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  const newContents = curSubject.contents.filter(
                    (cont) => cont.id !== content.id
                  );
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  renameCourse: (course: Course) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (course.id === curCourse.id)
          return {
            id: curCourse.id,
            name: course.name,
            chapters: curCourse.chapters,
          };
        return curCourse;
      });
      return { ...state };
    }),

  updateChapter: (chapter: Chapter, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapter = curCourse.chapters.map((curChapter) => {
            if (chapter.id === curChapter.id) {
              return {
                id: curChapter.id,
                name: chapter.name,
                brief: chapter.brief,
                subjects: curChapter.subjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: updatedChapter,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),
  updateSubject: (subject: Subject, chapterId: string, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapters = curCourse.chapters.map((curChapter) => {
            if (chapterId === curChapter.id) {
              const updatedSubjects = curChapter.subjects.map((curSubject) => {
                if (subject.id === curSubject.id) {
                  return {
                    id: curSubject.id,
                    name: subject.name,
                    contents: curSubject.contents,
                  };
                }
                return curSubject;
              });
              return {
                id: curCourse.id,
                name: curCourse.name,
                brief: curChapter.brief,
                subjects: updatedSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: updatedChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  updateComments: (
    content: Content,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (curCourse.id === courseId) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  const newContents = curSubject.contents.map((curContent) => {
                    if (curContent.id === content.id) return content;
                    return curContent;
                  });
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  setCourseName: (courseId, name) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.name = name;
      }
      return { ...state };
    }),

  setChapterBrief: (courseId, chapterIndex, brief) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].brief = brief;
      }
      return { ...state };
    }),
  setCourses: (courses) =>
    set((state) => ({
      ...state,
      courses: courses,
    })),
}));

export default useCoursesStore;
