import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private blogService: BlogService, private route: ActivatedRoute, private translate: TranslateService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleCode = params['code'];
      console.log('Loading article with code:', articleCode);
      this.loadArticles(articleCode);
    });

    this.translate.onLangChange.subscribe(() => {
      const articleCode = this.route.snapshot.params['code'];
      console.log('Language changed, reloading article with code:', articleCode);
      this.loadArticles(articleCode);
    });
  }

  loadArticles(articleCode?: string) {
    if (articleCode) {
      this.blogService.getArticleByCode(articleCode).subscribe(article => {
        if (article) {
          console.log('Article found:', article);
          this.articles = [article];
          this.selectArticle(article);
        } else {
          console.error('Article not found');
        }
      });
    }
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    console.log('Selected article:', article);
    this.relatedArticles = this.articles.filter(a => a !== article && a.tags.some(tag => article.tags.includes(tag)));
    this.teacherService.getTeacherByCode(article.authorCode).subscribe(teacher => {
      this.author = teacher;
    });
    if (article.code) {
      console.log('Navigating to article with code:', article.code);
      this.router.navigate(['/blog', article.code]);
    } else {
      console.error('Article code is missing');
    }
  }
}