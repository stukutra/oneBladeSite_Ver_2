import { Category, Talent } from '../../../models/talent.model';
import { Component, OnInit } from '@angular/core';

import { TalentService } from '../../../service/talent.service';

@Component({
  selector: 'app-TalentList',
  templateUrl: './TalentList.component.html',
  styleUrls: ['./TalentList.component.scss']
})
export class TalentListComponent implements OnInit {
  categories: Category[] = [];
  selectedTalent: Talent | null = null;
  selectedCategory: string | null = null;

  constructor(private talentService: TalentService) { }

  ngOnInit() {
    this.talentService.getTalents().subscribe(data => {
      this.categories = data.categories;
    });
  }

  showContactForm(talent: Talent, category: string) {
    this.selectedTalent = talent;
    this.selectedCategory = category;
  }
}