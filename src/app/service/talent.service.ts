import { Category } from '../models/talent.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TalentService {

    private jsonUrl = 'assets/data/talents.json';

    constructor(private http: HttpClient) { }

    getTalents(): Observable<{ categories: Category[] }> {
        return this.http.get<{ categories: Category[] }>(this.jsonUrl);
    }
}
