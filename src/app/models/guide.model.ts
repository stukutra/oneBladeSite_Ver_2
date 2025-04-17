export interface Topic {
    topic: string;
    description: string;
}

export interface Guide {
    title: string;
    description: string;
    topics: Topic[];
    image: string;
}

export interface GuidesResponse {
    guides: Guide[];
}