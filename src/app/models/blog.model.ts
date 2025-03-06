export interface Article {
    title: string;
    contentPath: string;
    content?: string;
    creationDate: string;
    author: string;
    authorPhoto: string;
    authorLinkedIn: string;
    description: string;
    readingTime: number;
    tags: string[];
}

export interface Category {
    name: string;
    articles: Article[];
}
