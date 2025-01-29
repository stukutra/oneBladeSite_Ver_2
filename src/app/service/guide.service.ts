import { Observable, map } from 'rxjs';

import { Guide } from '../models/guide.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private jsonUrl = 'assets/data/guides.json';

  constructor(private http: HttpClient) { }

  getGuides(): Observable<Guide[]> {
    return this.http.get<{ guides: Guide[] }>(this.jsonUrl).pipe(
      map((response: { guides: any; }) => response.guides)
    );
  }
}
