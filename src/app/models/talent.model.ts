export interface Talent {
    role: string;
    minContract: string;
    seniority: string;
    dailyRate: {
        "1_month": string;
        "3_months": string;
        "6_months": string;
    };
    skills: string[];
    frameworks_libraries: { name: string; link: string }[];
    tools: { name: string; link: string }[];
    languages_spoken: {
        [language: string]: string;
    };
    workType: string; // Aggiungi questa linea
    expanded?: boolean;
    expandedSkills?: boolean;
    expandedFrameworks?: boolean;
    expandedTools?: boolean;
    expandedLanguages?: boolean;
    selectedRate?: string;
    selectedRateIndex?: number;
}

export interface Category {
    name: string;
    talents: Talent[];
}
