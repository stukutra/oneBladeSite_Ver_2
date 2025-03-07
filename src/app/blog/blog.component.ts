import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/blog.model';
import { BlogService } from '../service/blog.service';
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

  constructor(private blogService: BlogService, private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.loadArticles(categoryName);
    });

    this.translate.onLangChange.subscribe(() => {
      const categoryName = this.route.snapshot.params['category'];
      this.loadArticles(categoryName);
    });
  }

  loadArticles(categoryName: string) {
    this.blogService.getArticlesByCategory(categoryName).subscribe(data => {
      this.articles = data;
      if (this.articles.length > 0) {
        this.selectArticle(this.articles[0]);
      }
    });
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    this.relatedArticles = this.articles.filter(a => a !== article && a.tags.some(tag => article.tags.includes(tag)));
  }
}