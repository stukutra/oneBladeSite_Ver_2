import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/blog.model';
import { BlogService } from '../service/blog.service';
import { Teacher } from '../models/teacher.model';
import { TeacherService } from '../service/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];
  selectedArticle: Article | null = null;
  relatedArticles: Article[] = [];
  author: Teacher | undefined;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private translate: TranslateService, private teacherService: TeacherService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      const articleCode = params['code'];
      this.loadArticles(categoryName, articleCode);
    });

    this.translate.onLangChange.subscribe(() => {
      const categoryName = this.route.snapshot.params['category'];
      const articleCode = this.route.snapshot.params['code'];
      this.loadArticles(categoryName, articleCode);
    });
  }

  loadArticles(categoryName: string, articleCode?: string) {
    this.blogService.getArticlesByCategory(categoryName).subscribe(data => {
      this.articles = data;
      if (this.articles.length > 0) {
        if (articleCode) {
          const article = this.articles.find(a => a.code === articleCode);
          if (article) {
            this.selectArticle(article);
          }
        } else {
          this.selectArticle(this.articles[0]);
        }
      }
    });
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    this.relatedArticles = this.articles.filter(a => a !== article && a.tags.some(tag => article.tags.includes(tag)));
    this.teacherService.getTeacherByCode(article.authorCode).subscribe(teacher => {
      this.author = teacher;
    });
  }
}