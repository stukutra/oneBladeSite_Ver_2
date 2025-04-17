import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stack } from '../models/stack.model';

@Injectable({
    providedIn: 'root'
})
export class StackService {
    private filePath = 'assets/data/Stacks.json';

    constructor(private http: HttpClient) { }

    getStacks(): Observable<Stack[]> {
        return this.http.get<{ images: Stack[] }>(this.filePath).pipe(
            map((data) => {
                console.log('Parsed JSON data:', data);
                return data.images;
            }),
            catchError((error) => {
                console.error('Error fetching JSON file:', error);
                throw error;
            })
        );
    }
}
