import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private jsonUrl = 'assets/data/courses.json';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
