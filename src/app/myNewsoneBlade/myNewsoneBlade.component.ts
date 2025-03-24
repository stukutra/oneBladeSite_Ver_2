import { Component, OnInit } from '@angular/core';

import { News } from '../models/news.model';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-myNewsoneBlade',
  templateUrl: './myNewsoneBlade.component.html',
  styleUrls: ['./myNewsoneBlade.component.scss']
})
export class MyNewsoneBladeComponent implements OnInit {
  news: News[] = [];
  currentPage: number = 1;
  newsPerPage: number = 3;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((data) => {
      this.news = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  get paginatedNews(): News[] {
    const startIndex = (this.currentPage - 1) * this.newsPerPage;
    return this.news.slice(startIndex, startIndex + this.newsPerPage);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.news.length / this.newsPerPage)).fill(0).map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage * this.newsPerPage < this.news.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
