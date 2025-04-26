import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private newsUrl = 'assets/data/news.json';

    constructor(private http: HttpClient) { }

    getNews(): Observable<News[]> {
        return this.http.get<News[]>(this.newsUrl);
    }

    getNewsById(id: number): Observable<News> {
        return this.http.get<News[]>(this.newsUrl).pipe(
            map((news) => news.find((item) => item.id === id)!)
        );
    }
}
