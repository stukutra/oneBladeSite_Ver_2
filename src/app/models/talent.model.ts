export interface Talent {
    name: string;
    minContract: string;
    description: string;
    seniority: string;
    dailyRate: number;
}

export interface Category {
    name: string;
    talents: Talent[];
}
