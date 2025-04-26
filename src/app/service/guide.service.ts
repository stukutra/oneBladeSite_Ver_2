import { Observable, map } from 'rxjs';

import { Guide } from '../models/guide.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private jsonUrl = 'assets/data/guides.json';

  constructor(private http: HttpClient, private translate: TranslateService) { }

  getGuides(): Observable<Guide[]> {
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const url = `assets/data/guides_${lang}.json`;
    const cacheBuster = `cb=${new Date().getTime()}`;
    const freshUrl = `${url}?${cacheBuster}`;
    return this.http.get<{ guides: Guide[] }>(freshUrl).pipe(
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
