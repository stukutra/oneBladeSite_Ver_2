export interface Guide {
    title: string;
    description: string;
    topics: string[];
    image: string;
}

export interface GuidesResponse {
    guides: Guide[];
}