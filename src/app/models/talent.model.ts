export interface Talent {
    name: string;
    minContract: string;
    description: string;
    seniority: string;
    dailyRate: number;
    pricePerDay: number; // Add the pricePerDay property
}

export interface Category {
    name: string;
    talents: Talent[];
}
