import { Component, OnInit } from '@angular/core';

import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './accademyoneblade.component.html',
  styleUrls: ['./accademyoneblade.component.scss']
})
export class AccademyonebladeComponent implements OnInit {

  constructor(private courseService: CoursesService) { }
  categories: any[] = [];
  
  ngOnInit() {
    this.courseService.getCourses().subscribe(
      (data) => {
        console.log(data.categories);
        this.categories = data.categories;
      },
      (error) => {
        console.error('Errore durante il caricamento dei dati:', error);
      }
    );
  }
}
