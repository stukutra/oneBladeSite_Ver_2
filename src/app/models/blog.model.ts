export interface Article {
    code: string;
    title: string;
    contentPaths: { [key: string]: string };
    content?: string;
    creationDate: Date;
    authorCode: string;
    description: string;
    readingTime: number;
    tags: string[];
    image: string;
    categoryName?: string;
    authorName?: string;
}

export interface Category {
    name: string;
    articles: Article[];
}
