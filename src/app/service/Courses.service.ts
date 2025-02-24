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
    return this.http.get(this.jsonUrl).pipe(
      map((data: any) => {
        const today = new Date();
        const monthIndex: { [key: string]: number } = {
          'Gennaio': 0, 'Febbraio': 1, 'Marzo': 2, 'Aprile': 3, 'Maggio': 4, 'Giugno': 5,
          'Luglio': 6, 'Agosto': 7, 'Settembre': 8, 'Ottobre': 9, 'Novembre': 10, 'Dicembre': 11
        };
        data.categories.forEach((category: any) => {
          category.courses.forEach((course: any) => {
            const futureDates: string[] = [];
            course.datecourse.forEach((dateString: string) => {
              const [day, month, year] = dateString.split(' ');
              const courseDate = new Date(parseInt(year), monthIndex[month], parseInt(day));
              const diffDays = Math.ceil((courseDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
              if (diffDays >= 0) {
                futureDates.push(dateString);
              }
            });
            course.datecourse = futureDates;
          });
        });
        return data;
      })
    );
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