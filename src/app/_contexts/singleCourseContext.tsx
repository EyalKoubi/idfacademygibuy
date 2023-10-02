import { create } from "zustand";

type Content = {
  name: string;
  fileName: string;
  comments: string;
};

type Subject = {
  name: string;
  contents: Content[];
};

type Chapter = {
  name: string;
  brief: string;
  subjects: Subject[];
};

type Course = {
  id: string;
  name: string;
  chapters: Chapter[];
};

type SingleCourseState = {
  course: Course;
};

type SingleCourseActions = {
  setCourse: (course: Course) => void;
  addChapter: (chapter: Chapter) => void;
  addContent: (
    chapterIndex: number,
    subjectIndex: number,
    content: Content
  ) => void;
  setCourseName: (name: string) => void;
  setCourseId: (id: string) => void;
  setChapterBrief: (chapterIndex: number, brief: string) => void;
};

const useSingleCourseStore = create<SingleCourseState & SingleCourseActions>(
  (set) => ({
    course: { id: "", name: "", chapters: [] },
    setCourse: (course) => set((state) => ({ ...state, course })),
    addChapter: (chapter) =>
      set((state) => ({
        ...state,
        course: {
          ...state.course,
          chapters: [...state.course.chapters, chapter],
        },
      })),
    addContent: (
      chapterIndex,
      subjectIndex,
      content // Added subjectIndex
    ) =>
      set((state) => {
        const chapter = state.course.chapters[chapterIndex];
        if (chapter && chapter.subjects[subjectIndex]) {
          chapter.subjects[subjectIndex].contents.push(content);
        }
        return { ...state };
      }),
    setCourseName: (name) =>
      set((state) => {
        const updatedCourse = {
          ...state.course,
          name: name,
        };
        return { ...state, course: updatedCourse };
      }),
    setCourseId: (id) =>
      set((state) => ({
        ...state,
        course: { ...state.course, id },
      })),
    setChapterBrief: (chapterIndex, brief) =>
      set((state) => {
        const chapter = state.course.chapters[chapterIndex];
        if (chapter) {
          chapter.brief = brief;
        }
        return { ...state };
      }),
  })
);

export default useSingleCourseStore;
