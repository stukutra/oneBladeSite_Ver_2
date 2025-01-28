import { Component, OnInit } from '@angular/core';

import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-accademyoneblade',
  templateUrl: './accademyoneblade.component.html',
  styleUrls: ['./accademyoneblade.component.scss']
})
export class AccademyonebladeComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }
  categories: any[] = []; // Tutte le categorie originali
  filteredCategories: any[] = []; // Categorie filtrate
  selectedCategory: string = 'all'; // Valore di default

  
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(data => {
      this.categories = data.categories;

      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0].title; // Imposta la prima categoria
        this.filterCourses(); // Filtra automaticamente
      }
    });
  }

  // Metodo per filtrare le categorie
  filterCourses(): void {
    this.filteredCategories = this.categories.filter(
      category => category.title === this.selectedCategory
    );
  }
}
