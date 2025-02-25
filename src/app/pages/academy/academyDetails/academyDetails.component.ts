import { Component, OnInit } from '@angular/core';
import { Course, Language } from 'src/app/models/course.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/service/Courses.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-academyDetails',
  templateUrl: './academyDetails.component.html',
  styleUrls: ['./academyDetails.component.scss']
})
export class AcademyDetailsComponent implements OnInit {
  course: Course | undefined;
  sanitizedDescription: SafeHtml | undefined;
  relatedCourses: { title: string, idCourse: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe(() => {
      this.reloadCourseDetails();
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const courseId = params.get('id');
        if (!courseId) {
          console.error("Errore: ID del corso non presente nell'URL.");
          return [];
        }
        return this.coursesService.getCoursesALL().pipe(
          map((data: { categories: { courses: Course[]; }[]; }) => {
            if (!data || !Array.isArray(data.categories)) {
              console.error("Errore: il service non ha restituito dati validi", data);
              return [];
            }

            this.course = data.categories
              .flatMap((category: { courses: Course[] }) => category.courses)
              .find((course: Course) => course.idCourse === courseId);

            if (!this.course) {
              console.error("Errore: Nessun corso trovato con ID:", courseId);
              return [];
            }

            // Carica la descrizione HTML dinamicamente
            if (this.course.descriptionFile) {
              this.loadCourseDescription(this.course.descriptionFile);
            }

            // Carica i corsi correlati
            this.getRelativeCourse(courseId);

            return [];
          })
        );
      })
    ).subscribe();
  }

  private reloadCourseDetails(): void {
    if (this.course?.idCourse) {
      this.coursesService.getCoursesALL().pipe(
        map((data: { categories: { courses: Course[]; }[]; }) => {
          if (!data || !Array.isArray(data.categories)) {
            console.error("Errore: il service non ha restituito dati validi", data);
            return [];
          }

          this.course = data.categories
            .flatMap((category: { courses: Course[] }) => category.courses)
            .find((course: Course) => course.idCourse === this.course?.idCourse);

          if (!this.course) {
            //console.error("Errore: Nessun corso trovato con ID:", this.course?.idCourse);
            return [];
          }

          // Carica la descrizione HTML dinamicamente
          if (this.course.descriptionFile) {
            this.loadCourseDescription(this.course.descriptionFile);
          }

          // Carica i corsi correlati
          this.getRelativeCourse(this.course.idCourse);

          return [];
        })
      ).subscribe();
    }
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

  // Metodo per ottenere i corsi correlati
  private getRelativeCourse(courseId: string): void {
    this.coursesService.getRelatedCourses(courseId).subscribe(
      relatedCourses => {
        this.relatedCourses = relatedCourses;
      },
      error => {
        console.error(`Errore nel caricamento dei corsi correlati per il corso ${courseId}:`, error);
      }
    );
  }

  bookCourse() {
    alert("Hai prenotato il corso con codice: " + this.course?.idCourse);
  }

  getDescription(): string {
    const lang = this.translate.currentLang as Language;
    return this.course?.description[lang] || '';
  }
}