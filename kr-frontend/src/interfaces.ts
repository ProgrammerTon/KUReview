export interface Professor {
    id?: string;
    number: string;
    title: string;
}

export interface Review {
    id?: string;
    comments: string;
    score: number;
    professorId?: string;
}