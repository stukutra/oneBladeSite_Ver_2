import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyAboutUs',
  templateUrl: './companyAboutUs.component.html',
  styleUrls: ['./companyAboutUs.component.scss']
})
export class CompanyAboutUsComponent implements OnInit {

  constructor() { }
  data = [
    { name: 'Fullstack', value: 95 },
    { name: 'Mobile (IOS, React Native,Android', value: 80 },
    { name: 'DOT NET', value: 60 },
    { name: 'Angular', value: 90 },
    { name: 'Python', value: 40 },
    { name: 'Data Engineering', value: 60 },
    { name: 'QA', value: 30 },
    { name: 'React', value: 50 },
    { name: 'UI/UX', value: 75 }
];

  ngOnInit() {
  }

}
