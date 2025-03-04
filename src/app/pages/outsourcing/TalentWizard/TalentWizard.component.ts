import { Category, Talent } from '../../../models/talent.model';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Step } from './step.enum'; // Import the Step enum
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
    step: Step = Step.Step1; // Use the enum for the step
    Step = Step; // Make the enum available in the template

    constructor(private talentService: TalentService, private http: HttpClient) { }

    ngOnInit() {
        this.talentService.getTalents().subscribe(data => {
            this.categories = data.categories.map(category => ({
                ...category,
                talents: category.talents.map(talent => ({
                    ...talent,
                    expanded: false,
                    expandedSkills: false,
                    expandedFrameworks: false,
                    expandedTools: false,
                    expandedLanguages: false,
                    selectedRateIndex: 3 // Set default value to 3
                }))
            }));
        });
    }

    selectCategory(category: Category) {
        this.selectedCategory = category;
        this.step = Step.Step2; // Use the enum for the step
    }

    selectTalent(talent: Talent) {
        this.selectedTalent = talent;
        this.step = Step.Step3; // Use the enum for the step
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
            this.step = Step.Step4; // Use the enum for the step
        }
    }

    goToStep(step: Step) {
        if (step === Step.Step1 || (step === Step.Step2 && this.selectedCategory) || (step === Step.Step3 && this.selectedTalent)) {
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