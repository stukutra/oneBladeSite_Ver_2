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
                            map(content => ({ ...article, content, code: article.code }))
                        );
                    });
                    forkJoin(articleObservables).subscribe(
                        articles => {
                            observer.next(articles.map(article => ({ ...article, code: article.code })));
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

    getArticleByCode(articleCode: string): Observable<Article | undefined> {
        return new Observable(observer => {
            this.getBlogData().subscribe(categories => {
                const articles = categories.flatMap(category => category.articles);
                const article = articles.find(a => a.code === articleCode);
                if (article) {
                    console.log('Article found in service:', article);
                    const lang = this.translate.currentLang;
                    const contentPath = article.contentPaths[lang] || article.contentPaths['en'];
                    this.http.get(contentPath, { responseType: 'text' }).subscribe(
                        content => {
                            observer.next({ ...article, content });
                            observer.complete();
                        },
                        error => observer.error(error)
                    );
                } else {
                    console.error('Article not found in service');
                    observer.error('Article not found');
                    observer.complete();
                }
            });
        });
    }
}