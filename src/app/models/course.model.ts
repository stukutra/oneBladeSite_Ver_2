export type Language = 'it' | 'en' | 'es';

export interface Course {
    active: boolean;
    idCourse: string;
    title: string;
    duration: string;
    mode: string;
    description: Record<Language, string>;
    lessons: number;
    time: string;
    level: string;
    nature: string;
    overview: string;
    learning_outcomes: string[];
    datecourse: string[];
    requirements: Requirement[];
    course_contents: CourseContent[];
    descriptionFile: string;
    price: string;
}

export interface Requirement {
    title: string;
    description: string;
}

export interface CourseContent {
    title: string;
    text: string;
}

export interface Category {
    title: string;
    courses: Course[];
}

export interface CourseCatalog {
    categories: Category[];
}