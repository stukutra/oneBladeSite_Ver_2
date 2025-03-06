import { Article, Category } from '../models/blog.model';
import { Observable, forkJoin } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private baseJsonUrl = 'assets/data/blog.json';

    constructor(private http: HttpClient) { }

    getBlogData(): Observable<Category[]> {
        return this.http.get<{ categories: Category[] }>(this.baseJsonUrl).pipe(
            map(response => response.categories)
        );
    }

    getArticlesByCategory(categoryName: string): Observable<Article[]> {
        return new Observable(observer => {
            this.getBlogData().subscribe(categories => {
                const category = categories.find(cat => cat.name === categoryName);
                if (category) {
                    const articleObservables = category.articles.map(article =>
                        this.http.get(article.contentPath, { responseType: 'text' }).pipe(
                            map(content => ({ ...article, content }))
                        )
                    );
                    forkJoin(articleObservables).subscribe(articlesWithContent => {
                        observer.next(articlesWithContent);
                        observer.complete();
                    });
                } else {
                    observer.error('Category not found');
                }
            });
        });
    }
}