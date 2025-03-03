import { Category, Talent } from '../../../models/talent.model';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TalentService } from '../../../service/talent.service';

@Component({
    selector: 'app-talent-wizard',
    templateUrl: './TalentWizard.component.html',
    styleUrls: ['./TalentWizard.component.scss']
})
export class TalentWizardComponent implements OnInit {
    categories: Category[] = [];
    selectedCategory: Category | null = null;
    selectedTalent: Talent | null = null;
    step: number = 1;

    constructor(private talentService: TalentService, private http: HttpClient) { }

    ngOnInit() {
        this.talentService.getTalents().subscribe(data => {
            this.categories = data.categories.map(category => ({
                ...category,
                talents: category.talents.map(talent => ({
                    ...talent,
                    expanded: false, // Inizializza la proprietà expanded
                    expandedSkills: false, // Inizializza la proprietà expandedSkills
                    expandedFrameworks: false, // Inizializza la proprietà expandedFrameworks
                    expandedTools: false, // Inizializza la proprietà expandedTools
                    expandedLanguages: false, // Inizializza la proprietà expandedLanguages
                    selectedRateIndex: 1 // Inizializza l'indice della tariffa selezionata
                }))
            }));
        });
    }

    selectCategory(category: Category) {
        this.selectedCategory = category;
        this.step = 2;
    }

    selectTalent(talent: Talent) {
        this.selectedTalent = talent;
        this.step = 3;
    }

    changeRate(talent: Talent, rate: string) {
        talent.selectedRate = rate;
    }

    updateRate(talent: Talent) {
        switch (talent.selectedRateIndex) {
            case 1:
                talent.selectedRate = '1_month';
                break;
            case 2:
                talent.selectedRate = '3_months';
                break;
            case 3:
                talent.selectedRate = '6_months';
                break;
        }
    }

    handleEmailSent(success: boolean) {
        if (success) {
            this.step = 4;
        }
    }

    goToStep(step: number) {
        if (step === 1 || (step === 2 && this.selectedCategory) || (step === 3 && this.selectedTalent)) {
            this.step = step;
        }
    }

    getLanguages(languages: { [language: string]: string } | undefined): string[] {
        return languages ? Object.keys(languages) : [];
    }

    getLanguagesString(languages: { [language: string]: string } | undefined): string {
        return languages ? Object.keys(languages).map(lang => `${lang}: ${languages[lang]}`).join(', ') : '';
    }
}