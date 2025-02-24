import { Category, Course } from 'src/app/models/course.model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { CoursesService } from 'src/app/service/Courses.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './academyoneblade.component.html',
  styleUrls: ['./academyoneblade.component.scss']
})
export class AcademyonebladeComponent implements OnInit {

  categories: Category[] = []; // Solo categorie con corsi attivi
  courseDescriptions: { [key: string]: SafeHtml } = {}; // Memorizza le descrizioni HTML per ogni corso

  constructor(private coursesService: CoursesService, private sanitizer: DomSanitizer, private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.loadCourseDescriptions();
    });
  }

  ngOnInit(): void {
    this.coursesService.getCoursesActive().subscribe(data => {
      if (!data || !Array.isArray(data)) {
        console.error("Errore: il service non restituisce dati validi", data);
        return;
      }

      // Filtra le categorie per mantenere solo i corsi attivi
      this.categories = data
        .map((category: Category) => ({
          ...category,
          courses: category.courses.filter((course: Course) => course.active === true)
        }))
        .filter((category: Category) => category.courses.length > 0);

      this.loadCourseDescriptions();
    });
  }

  private loadCourseDescriptions(): void {
    this.categories.forEach(category => {
      category.courses.forEach(course => {
        if (course.descriptionFile) {
          this.loadCourseDescription(course.idCourse, course.descriptionFile);
        }
      });
    });
  }

  // Metodo per caricare le descrizioni HTML dei corsi
  private loadCourseDescription(courseId: string, filePath: string): void {
    this.coursesService.getCourseDescription(filePath).subscribe(
      htmlContent => {
        this.courseDescriptions[courseId] = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
      },
      error => {
        console.error(`Errore nel caricamento della descrizione per il corso ${courseId}:`, error);
      }
    );
  }
}