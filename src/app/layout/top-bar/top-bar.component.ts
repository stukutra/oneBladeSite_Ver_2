import { Component, HostListener } from '@angular/core';
import { Course, Language } from '../../models/course.model';

import { CoursesService } from 'src/app/service/Courses.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  isMenuOpen: boolean = false;

  isChristmasModalVisible: boolean = false;

  isDropdownOpen: { [key: string]: boolean } = {};


  constructor(private router: Router, private translate: TranslateService, private coursesService: CoursesService) {
    this.translate.addLangs(['en', 'it', 'es']);
    this.translate.setDefaultLang('it');
    this.translate.use('it'); // Ensure the initial language is set to Italian
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;

    // Se il menu è aperto e il clic è fuori dall'intera area del menu, chiudi il menu
    if (this.isMenuOpen && navbarToggler && navbarCollapse && !navbarCollapse.contains(event.target as Node) && !navbarToggler.contains(event.target as Node)) {
      navbarToggler.click(); // Trigger the click event to close the menu
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;

    if (this.isMenuOpen) {
      navbarCollapse.classList.add('show'); // Forza l'apertura del menu
    } else {
      navbarCollapse.classList.remove('show'); // Forza la chiusura del menu
    }
  }

  toggleDropdown(dropdownId: string): void {
    // Close all other dropdowns
    Object.keys(this.isDropdownOpen).forEach(key => {
      if (key !== dropdownId) {
        this.isDropdownOpen[key] = false;
      }
    });

    // Toggle the current dropdown
    this.isDropdownOpen[dropdownId] = !this.isDropdownOpen[dropdownId];
  }

  closeMenu(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;

    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show'); // Assicura la chiusura del menu
      this.isMenuOpen = false;
    }

    // Chiudi tutti i dropdown
    this.isDropdownOpen = {};
  }

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.closeMenu();
    });
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang).subscribe(() => {
      this.coursesService.getCoursesALL().subscribe(); // Reload courses data
    });
    this.closeMenu();
  }

  openChristmasModal(event: Event): void {
    event.preventDefault(); // Previene il comportamento predefinito del link
    this.isChristmasModalVisible = true; // Mostra la modale
  }

  closeChristmasModal(): void {
    this.isChristmasModalVisible = false; // Nasconde la modale
  }

  getDescription(course: Course): string {
    const lang = this.translate.currentLang;
    return course.description[lang as Language];
  }
}
