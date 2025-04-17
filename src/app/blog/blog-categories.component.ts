import { Article, Category } from '../models/blog.model';
import { Component, OnInit } from '@angular/core';

import { BlogService } from '../service/blog.service';
import { Router } from '@angular/router';
import { Teacher } from '../models/teacher.model';
import { TeacherService } from '../service/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-blog-categories',
    templateUrl: './blog-categories.component.html',
    styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {
    categories: Category[] = [];
    articles: Article[] = [];
    paginatedArticles: Article[] = [];
    currentPage: number = 1;
    articlesPerPage: number = 6;
    authors: Teacher[] = [];
    isLoading: boolean = true;

    constructor(
        private blogService: BlogService,
        private router: Router,
        private translateService: TranslateService,
        private teacherService: TeacherService
    ) { }

    ngOnInit() {       
        this.loadBlogData();
    }

    loadBlogData() {
        this.isLoading = true;
        this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
            this.authors = teachers;
            this.blogService.getBlogData().subscribe(data => {
                this.categories = data || [];
                this.articles = this.categories.flatMap((category: Category) => {
                    return category.articles.map(article => ({
                        ...article,
                        categoryName: category.name,
                        authorName: this.getAuthorName(article.authorCode)
                    })) || [];
                });
                this.updatePaginatedArticles();
                this.isLoading = false;
            });
        });
    }

    getAuthorName(authorCode: string): string {
        const author = this.authors.find(teacher => teacher.code === authorCode);
        return author ? author.name : 'Unknown';
    }

    updatePaginatedArticles() {
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        this.paginatedArticles = this.articles.slice(startIndex, endIndex);
    }

    selectCategory(category: Category) {
        this.router.navigate(['/blog', category.name]);
    }

    selectArticle(article: Article) {
        if (article.code) {
            this.router.navigate(['/blog', article.code]);
        } else {
            console.error('Article is missing code');
        }
    }

    getCurrentLanguage(): string {
        return this.translateService.currentLang;
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.isLoading = true;
        this.updatePaginatedArticles();
        this.isLoading = false;
    }

    get totalPages(): number {
        return Math.ceil(this.articles.length / this.articlesPerPage);
    }
}
