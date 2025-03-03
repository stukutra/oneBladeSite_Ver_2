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
    expanded?: boolean; // Aggiungi questa proprietà
    expandedSkills?: boolean; // Aggiungi questa proprietà
    expandedFrameworks?: boolean; // Aggiungi questa proprietà
    expandedTools?: boolean; // Aggiungi questa proprietà
    expandedLanguages?: boolean; // Aggiungi questa proprietà
}

export interface Category {
    name: string;
    talents: Talent[];
}
