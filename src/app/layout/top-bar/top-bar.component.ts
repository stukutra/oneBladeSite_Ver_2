import { Component, HostListener } from '@angular/core';
import { Course, Language } from '../../models/course.model';

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

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.addLangs(['en', 'it', 'es']);
    this.translate.setDefaultLang('it');
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
  }

  closeMenu(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;

    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
      this.isMenuOpen = false;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.closeMenu();
    });
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
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
