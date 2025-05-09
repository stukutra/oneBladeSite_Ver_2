import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Article } from '../models/blog.model';
import { BlogService } from '../service/blog.service';
import { Location } from '@angular/common';
import { Teacher } from '../models/teacher.model';
import { TeacherService } from '../service/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  selectedArticle: Article | null = null;
  relatedArticles: Article[] = [];
  author: Teacher | undefined;
  private langChangeSubscription: any;
  breadcrumb: string[] = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute, private translate: TranslateService, private teacherService: TeacherService, private router: Router, private location: Location) {
    this.translate.onLangChange.subscribe(() => {
      console.log('Language changed to:', this.translate.currentLang);
    });
    if (!this.translate.currentLang) {
      this.translate.setDefaultLang('it');
      this.translate.use('it');
    }
    console.log('Initial language:', this.translate.currentLang);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleCode = params['code'];
      this.loadArticles(articleCode);
      this.updateBreadcrumb(articleCode);
    });

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      console.log('Language changed:', this.translate.currentLang);
      this.loadAllArticles();
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  loadAllArticles() {
    this.blogService.getAllArticles().subscribe(articles => {
      console.log('Loaded articles:', articles);
      this.articles = articles;
      const articleCode = this.route.snapshot.params['code'];
      if (articleCode) {
        const selectedArticle = this.articles.find(article => article.code === articleCode);
        if (selectedArticle) {
          this.selectArticle(selectedArticle);
        }
      }
      this.updateRelatedArticles();
    });
  }

  loadArticles(articleCode?: string) {
    if (articleCode) {
      this.blogService.getArticleByCode(articleCode).subscribe(article => {
        if (article) {
          console.log('Loaded article:', article);
          this.articles = [article];
          this.selectArticle(article);
          this.updateRelatedArticles();
        } else {
          console.error('Article not found');
        }
      });
    }
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    this.updateRelatedArticles();
    this.teacherService.getTeacherByCode(article.authorCode).subscribe(teacher => {
      this.author = teacher;
    });
    if (article.code) {
      this.router.navigate(['/blog', article.code]);
    } else {
      console.error('Article code is missing');
    }
  }

  updateRelatedArticles() {
    if (this.selectedArticle) {
      this.relatedArticles = this.articles.filter(a => a !== this.selectedArticle && a.tags.some(tag => this.selectedArticle!.tags.includes(tag)));
    }
  }

  updateBreadcrumb(articleCode?: string) {
    if (articleCode) {
      this.blogService.getArticleByCode(articleCode).subscribe(article => {
        if (article) {
          this.breadcrumb = ['Home', 'Blog', article.title];
        } else {
          this.breadcrumb = ['Home', 'Blog'];
        }
      });
    } else {
      this.breadcrumb = ['Home', 'Blog'];
    }
  }

  goBack() {
    this.location.back();
  }
}