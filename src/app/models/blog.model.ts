export interface Article {
    code: string;
    title: string;
    contentPaths: { [key: string]: string };
    content?: string;
    creationDate: string;
    authorCode: string;
    description: string;
    readingTime: number;
    tags: string[];
    image: string;
}

export interface Category {
    name: string;
    articles: Article[];
}
