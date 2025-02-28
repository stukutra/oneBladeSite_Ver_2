import { Category, Talent } from '../../../models/talent.model';
import { Component, OnInit } from '@angular/core';

import { TalentService } from '../../../services/talent.service';

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

    constructor(private talentService: TalentService) { }

    ngOnInit() {
        this.talentService.getTalents().subscribe(data => {
            this.categories = data.categories;
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

    onFormSubmit() {
        this.step = 4;
    }

    goToStep(step: number) {
        if (step === 1 || (step === 2 && this.selectedCategory) || (step === 3 && this.selectedTalent)) {
            this.step = step;
        }
    }
}
