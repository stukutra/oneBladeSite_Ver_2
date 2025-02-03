export interface Course {
    idCourse: string;
    title: string;
    duration: string;
    mode: string;
    description: string;
    lessons: number;
    time: string;
    level: string;
    nature: string;
    overview: string;
    learning_outcomes: string[];
    requirements: Requirement[];
    course_contents: CourseContent[];
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