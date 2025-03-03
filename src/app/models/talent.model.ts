export interface Talent {
    role: string;
    minContract: string;
    seniority: string;
    dailyRate: string; // Cambiato da number a string
    pricePerDay: string; // Cambiato da number a string
    skills: string[];
    frameworks_libraries: string[];
    tools: string[];
    languages_spoken: {
        [language: string]: string;
    };
}

export interface Category {
    name: string;
    talents: Talent[];
}
