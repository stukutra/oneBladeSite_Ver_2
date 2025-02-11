import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './academyoneblade.component.html',
  styleUrls: ['./academyoneblade.component.scss']
})
export class AcademyonebladeComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  categories: Category[] = []; // Tutte le categorie originali

  ngOnInit(): void {
  this.coursesService.getCourses().subscribe(data => {
      this.categories = data.categories;
      console.log(data.categories)
    });
  }
}
