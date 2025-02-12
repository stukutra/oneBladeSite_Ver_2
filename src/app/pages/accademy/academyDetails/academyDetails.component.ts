import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-academyDetails',
  templateUrl: './academyDetails.component.html',
  styleUrls: ['./academyDetails.component.scss']
})
export class AcademyDetailsComponent implements OnInit {
  course: Course | undefined;
  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
  
    if (!courseId) {
      console.error("Errore: ID del corso non presente nell'URL.");
      return; // Evita di eseguire il codice se l'ID non è presente
    }
  
    this.coursesService.getCoursesALL().subscribe(data => {
      if (!data || !Array.isArray(data.categories)) {
        console.error("Errore: il service non ha restituito dati validi", data);
        return;
      }
  
      this.course = data.categories
        .flatMap((category: { courses: Course[] }) => category.courses)
        .find((course: { idCourse: string }) => course.idCourse === courseId);
  
      if (!this.course) {
        console.error("Errore: Nessun corso trovato con ID:", courseId);
      }
    });
  }

  bookCourse() {
    alert("Hai prenotato il corso con codice: " + this.course?.idCourse);
  }

}
