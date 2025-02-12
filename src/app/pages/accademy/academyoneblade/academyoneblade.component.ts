import { Category, Course } from 'src/app/models/course.model';
import { Component, OnInit } from '@angular/core';

import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './academyoneblade.component.html',
  styleUrls: ['./academyoneblade.component.scss']
})
export class AcademyonebladeComponent implements OnInit {

  categories: Category[] = []; // Solo categorie con corsi attivi

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCoursesActive().subscribe(data => {
      if (!data || !Array.isArray(data)) {
        console.error("Errore: il service non restituisce dati validi", data);
        return;
      }

      // Applica il filtro ai corsi attivi
      this.categories = data
        .map((category: Category) => ({
          ...category,
          courses: category.courses.filter((course: Course) => course.active === true) // Filtra solo i corsi attivi
        }))
        .filter((category: Category) => category.courses.length > 0); // Mantiene solo le categorie con corsi attivi
    });
  }
}