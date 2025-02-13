import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  sanitizedDescription: SafeHtml | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (!courseId) {
      console.error("Errore: ID del corso non presente nell'URL.");
      return; // Blocca l'esecuzione se non c'è l'ID
    }

    this.coursesService.getCoursesALL().subscribe(data => {
      if (!data || !Array.isArray(data.categories)) {
        console.error("Errore: il service non ha restituito dati validi", data);
        return;
      }

      this.course = data.categories
        .flatMap((category: { courses: Course[] }) => category.courses)
        .find((course: Course) => course.idCourse === courseId);

      if (!this.course) {
        console.error("Errore: Nessun corso trovato con ID:", courseId);
        return;
      }

      // Carica la descrizione HTML dinamicamente
      if (this.course.descriptionFile) {
        this.loadCourseDescription(this.course.descriptionFile);
      }
    });
  }

  // Metodo per caricare la descrizione HTML
  private loadCourseDescription(filePath: string): void {
    this.coursesService.getCourseDescription(filePath).subscribe(
      htmlContent => {
        this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      },
      error => {
        console.error(`Errore nel caricamento della descrizione per il corso ${this.course?.idCourse}:`, error);
      }
    );
  }

  bookCourse() {
    alert("Hai prenotato il corso con codice: " + this.course?.idCourse);
  }
}