// export type CourseDataCard = {
//   name: string;
//   image: string;
//   chapters: ChapterData[];
// };

export enum Users {
  Admin = 1,
  Editor = 2,
  Creator = 3,
  User = 4,
}

export type ContentData = {
  id: string;
  file_name: string;
  comments: string;
};

export type SubjectData = {
  id: string;
  name: string;
  contents: ContentData[];
};

export type ChapterData = {
  id: string;
  name: string;
  brief: string;
  subjects: SubjectData[];
};
export type CourseData = {
  id: string;
  name: string;
  img_id:ContentData|null;
  creationTimestamp:Date|null;
  chapters: ChapterData[];
};

export type UserRequestsCourse={
  user:any;
  course:CourseData;
};
// export type CourseData = {
//   id: string;
//   name: string;
//   chapters: ChapterData[];
// };

export type CoursesState = {
  courses: CourseData[];
  initinalCourse:CourseData;
};
export type UserState = {
  user: any;
  userCourses:CourseData[];
  adminCourses:CourseData[];
  coursesProgress: UserCourseProgress[]; 
}

//user process structre
export type UserCourseProgress = {
  courseId: string;
  lastChapterId: string;
  lastSubjectId: string;
  firstUnwatchedContentId:string;
  contentProgress: ContentProgress[];
};
export type ContentProgress = {
  chapterId:string;
  subjectId: string;
  contents: ContentItemProgress[];
};

export type ContentItemProgress = {
  contentId: string;
  watched: boolean;
};

export type UserRequestCourseState={
  userRequestsCourses:UserRequestsCourse[];
}

export type EnhancedContentData = ContentData & {
  mediaSrc: string;
  mediaType: string;
};


//for the fiture of continue standing 


