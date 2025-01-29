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

  getGuideByTitle(title: string): Observable<Guide | undefined> {
    return this.getGuides().pipe(
      map(guides => guides.find(guide => this.formatTitle(guide.title) === title))
    );
  }
  
  private formatTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }
}
