import { Component, OnInit } from '@angular/core';

import { BlogService } from '../service/blog.service';
import { Category } from '../models/blog.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog-categories',
    templateUrl: './blog-categories.component.html',
    styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {
    categories: Category[] = [];

    constructor(private blogService: BlogService, private router: Router) { }

    ngOnInit() {
        this.blogService.getBlogData().subscribe(data => {
            this.categories = data;
        });
    }

    selectCategory(category: Category) {
        this.router.navigate(['/blog', category.name]);
    }
}
