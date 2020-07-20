export interface ICourseContext {
  course?: string;
  week?: string;
}

export type CourseToWeeksDictionary = {[course: string]: string[]}

export type CourseContextType = 'course' | 'week';
