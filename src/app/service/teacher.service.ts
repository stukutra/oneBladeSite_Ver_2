import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    private baseJsonUrl = 'assets/data/teachers.json';

    constructor(private http: HttpClient) { }

    getTeacherData(): Observable<Teacher[]> {
        return this.http.get<{ teachers: Teacher[] }>(this.baseJsonUrl).pipe(
            map(response => response.teachers)
        );
    }

    getTeacherByCode(code: string): Observable<Teacher | undefined> {
        return this.getTeacherData().pipe(
            map(teachers => teachers.find(teacher => teacher.code === code))
        );
    }
}
