import { Article, Category } from '../models/blog.model';
import { Component, OnInit } from '@angular/core';

import { BlogService } from '../service/blog.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog-categories',
    templateUrl: './blog-categories.component.html',
    styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {
    categories: Category[] = [];
    articles: Article[] = [];

    constructor(private blogService: BlogService, private router: Router) { }

    ngOnInit() {
        this.blogService.getBlogData().subscribe(data => {
            this.categories = data;
            this.articles = this.categories.flatMap(category => category.articles);
        });
    }

    selectCategory(category: Category) {
        this.router.navigate(['/blog', category.name]);
    }

    selectArticle(article: Article) {
        this.router.navigate(['/blog', article.title]);
    }
}
