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
  name: string;
  brief: string;
  subjects: SubjectData[];
};

export type CourseData = {
  id: number;
  name: string;
  chapters: ChapterData[];
};
