export type ContentData = {
  name: string;
  file_name: string;
  comments: string;
};

export type SubjectData = {
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
  chapters: ChapterData[];
};
