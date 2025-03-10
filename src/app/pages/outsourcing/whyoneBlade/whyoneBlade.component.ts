import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-whyoneBlade',
  templateUrl: './whyoneBlade.component.html',
  styleUrls: ['./whyoneBlade.component.scss']
})
export class WhyoneBladeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTalentWizard() {
    this.router.navigate(['/talentWizard']);
  }
}
