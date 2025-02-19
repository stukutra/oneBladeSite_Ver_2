import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyAboutUs',
  templateUrl: './companyAboutUs.component.html',
  styleUrls: ['./companyAboutUs.component.scss']
})
export class CompanyAboutUsComponent implements OnInit {

  constructor() { }
  dataGroups = [
    {
      category: 'Sviluppo Web',
      technologies: [
        { name: 'Fullstack', value: 95 },
        { name: 'Angular', value: 90 },
        { name: 'React', value: 50 }
      ]
    },
    {
      category: 'Mobile Development',
      technologies: [
        { name: 'Mobile (iOS, React Native, Android)', value: 80 },
        { name: 'IOS', value: 60 },
        { name: 'React Native', value: 50 }
      ]
    },
    {
      category: 'Backend & Cloud',
      technologies: [
        { name: 'DOT NET', value: 60 },
        { name: 'Python', value: 40 },
        { name: 'Data Engineering', value: 60 }
      ]
    },
    {
      category: 'Quality Assurance & UI/UX',
      technologies: [
        { name: 'QA', value: 30 },
        { name: 'UI/UX', value: 75 }
      ]
    }
  ];

  ngOnInit() {
  }

}
