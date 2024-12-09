export interface Course {
    id?: string;
    number: string;
    title: string;
}

export interface Review {
    id?: string;
    comments: string;
    score: number;
    courseId?: string;
}