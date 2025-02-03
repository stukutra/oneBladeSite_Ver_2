import { Component, OnInit } from '@angular/core';

import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './accademyoneblade.component.html',
  styleUrls: ['./accademyoneblade.component.scss']
})
export class AccademyonebladeComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  categories: any[] = []; // Tutte le categorie originali

  ngOnInit(): void {
  this.coursesService.getCourses().subscribe(data => {
      this.categories = data.categories;
    });
  }
}
