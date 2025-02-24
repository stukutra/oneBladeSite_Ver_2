import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private jsonUrl = 'assets/data/courses.json';

  constructor(private http: HttpClient) { }

  getCoursesActive(): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(
      map((data: any) => {
        return data.categories
          .map((category: any) => ({
            ...category,
            courses: category.courses.filter((course: Course) => course.active === true)
          }))
          .filter((category: any) => category.courses.length > 0);
      })
    );
  }

  getCoursesALL(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  getCourseDescription(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

  getRelatedCourses(idCourse: string): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(
      map((data: any) => {
        for (let category of data.categories) {
          const course = category.courses.find((course: Course) => course.idCourse === idCourse);
          if (course) {
            return category.courses
              .filter((course: Course) => course.idCourse !== idCourse)
              .map((course: Course) => ({ title: course.title, idCourse: course.idCourse }));
          }
        }
        return [];
      })
    );
  }
}