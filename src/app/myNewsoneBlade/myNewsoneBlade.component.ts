import { Component, HostListener, OnInit } from '@angular/core';

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
  newsPerPage: number = 3; // Default to 3 items per page

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.updateNewsPerPage(); // Set the initial number of items per page
    this.newsService.getNews().subscribe((data) => {
      this.news = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateNewsPerPage(); // Update the number of items per page on window resize
  }

  private updateNewsPerPage() {
    const width = window.innerWidth;
    if (width < 576) {
      this.newsPerPage = 1; // 1 item for small screens
    } else if (width < 768) {
      this.newsPerPage = 2; // 2 items for medium screens
    } else {
      this.newsPerPage = 3; // 3 items for large screens
    }
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
