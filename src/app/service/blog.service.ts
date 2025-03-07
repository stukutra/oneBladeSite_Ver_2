import { Article, Category } from '../models/blog.model';
import { Observable, forkJoin } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherService } from './teacher.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private baseJsonUrl = 'assets/data/blog.json';

    constructor(private http: HttpClient, private translate: TranslateService, private teacherService: TeacherService) { }

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
                    const lang = this.translate.currentLang;
                    const articleObservables = category.articles.map(article => {
                        const contentPath = article.contentPaths[lang] || article.contentPaths['en'];
                        return this.http.get(contentPath, { responseType: 'text' }).pipe(
                            map(content => ({ ...article, content }))
                        );
                    });
                    forkJoin(articleObservables).subscribe(
                        articles => {
                            observer.next(articles);
                            observer.complete();
                        },
                        error => observer.error(error)
                    );
                } else {
                    observer.error('Category not found');
                    observer.complete();
                }
            });
        });
    }
}