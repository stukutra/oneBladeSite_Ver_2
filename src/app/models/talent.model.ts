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
    frameworks_libraries: string[];
    tools: string[];
    languages_spoken: {
        [language: string]: string;
    };
    expanded?: boolean;
    expandedSkills?: boolean;
    expandedFrameworks?: boolean;
    expandedTools?: boolean;
    expandedLanguages?: boolean;
}

export interface Category {
    name: string;
    talents: Talent[];
}
