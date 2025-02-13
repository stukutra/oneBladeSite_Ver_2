import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-academyEndorserBanner',
  templateUrl: './academyEndorserBanner.component.html',
  styleUrls: ['./academyEndorserBanner.component.scss']
})
export class AcademyEndorserBannerComponent implements OnInit {

  constructor() { }
  docenti = [
    { nome: 'Maria Rossi', ruolo: 'Esperta in Angular e TypeScript', img: '../../../../assets/accademy/docenti/user-icon-512.png' },
    { nome: 'Luca Bianchi', ruolo: 'Specialista in .NET Core e API', img: '../../../../assets/accademy/docenti/user-icon-512.png' },
    { nome: 'Giulia Verdi', ruolo: 'Senior UX Designer', img: '../../../../assets/accademy/docenti/user-icon-512.png' },
    { nome: 'Roberto Neri', ruolo: 'Cloud Engineer AWS', img: '../../../../assets/accademy/docenti/user-icon-512.png' }
  ];

  currentIndex = 0;
  slidesToShow = 4; // Default per desktop
  totalSlides = this.docenti.length;
  autoplayInterval: any;
  fadeActive = false;

  @HostListener('window:resize', [])
  onResize() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.slidesToShow = 1;
    } else if (width <= 1024) {
      this.slidesToShow = 2;
    } else if (width <= 1280) {
      this.slidesToShow = 3;
    } else {
      this.slidesToShow = 4;
    }

    // Evita il cambio se non ci sono abbastanza elementi
    if (this.totalSlides <= this.slidesToShow) {
      this.currentIndex = 0;
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  ngOnInit() {
    this.onResize();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    if (this.autoplayInterval) return;
    this.autoplayInterval = setInterval(() => {
      this.nextFade();
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  nextFade() {
    if (this.totalSlides > this.slidesToShow) {
      this.fadeActive = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + this.slidesToShow) % this.totalSlides;
        this.fadeActive = false;
      }, 500);
    }
  }

  getCurrentSlides() {
    return this.docenti.slice(this.currentIndex, this.currentIndex + this.slidesToShow);
  }

}
