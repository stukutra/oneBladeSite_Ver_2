import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private newsUrl = 'assets/data/news.json';

    constructor(private http: HttpClient) { }

    getNews(): Observable<News[]> {
        return this.http.get<News[]>(this.newsUrl);
    }
}
