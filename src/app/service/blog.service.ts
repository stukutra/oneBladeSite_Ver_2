import { Article, Category } from '../models/blog.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherService } from './teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private baseJsonUrl = 'assets/data/blog.json';

    constructor(private http: HttpClient, private translate: TranslateService, private teacherService: TeacherService) {
        this.translate.onLangChange.subscribe(() => {
            console.log('Language changed to:', this.translate.currentLang);
        });
        if (!this.translate.currentLang) {
            this.translate.setDefaultLang('it');
            this.translate.use('it');
        }
        console.log('Initial language:', this.translate.currentLang);
    }

    getBlogData(): Observable<Category[]> {
        return this.http.get<{ categories: Category[] }>(this.baseJsonUrl).pipe(
            map(response => response.categories.map(category => ({
                ...category,
                articles: category.articles.map(article => ({
                    ...article,
                    creationDate: new Date(article.creationDate) // Parse creationDate as Date
                }))
            })))
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

    getAllArticles(): Observable<Article[]> {
        return new Observable(observer => {
            this.getBlogData().subscribe(categories => {
                const articles = categories.flatMap(category => category.articles);
                const lang = this.translate.currentLang;
                console.log('Current language:', lang);
                const articleObservables = articles.map(article => {
                    const contentPath = article.contentPaths[lang] || article.contentPaths['en'];
                    console.log('Loading content from:', contentPath);
                    return this.http.get(contentPath, { responseType: 'text' }).pipe(
                        map(content => ({ ...article, content, code: article.code })),
                        catchError(error => {
                            console.error(`Error loading content from ${contentPath}:`, error);
                            return of({ ...article, content: 'Error loading content', code: article.code });
                        })
                    );
                });
                forkJoin(articleObservables).subscribe(
                    articles => {
                        observer.next(articles.map(article => ({ ...article, code: article.code })));
                        observer.complete();
                    },
                    error => observer.error(error)
                );
            });
        });
    }

    getArticleByCode(articleCode: string): Observable<Article | undefined> {
        return new Observable(observer => {
            this.getBlogData().subscribe(categories => {
                const articles = categories.flatMap(category => category.articles);
                const article = articles.find(a => a.code === articleCode);
                if (article) {
                    const lang = this.translate.currentLang;
                    console.log('Current language:', lang);
                    const contentPath = article.contentPaths[lang] || article.contentPaths['en'];
                    console.log('Loading content from:', contentPath);
                    this.http.get(contentPath, { responseType: 'text' }).subscribe(
                        content => {
                            observer.next({ ...article, content });
                            observer.complete();
                        },
                        error => {
                            console.error(`Error loading content from ${contentPath}:`, error);
                            observer.error(error);
                        }
                    );
                } else {
                    observer.error('Article not found');
                    observer.complete();
                }
            });
        });
    }
}