import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  constructor(private router: Router) { }

  closeMenu(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    
    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); // Trigger the click event to close the menu
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.closeMenu();
    });
  }
}
