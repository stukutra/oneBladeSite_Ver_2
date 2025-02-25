import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-logos',
  templateUrl: './company-logos.component.html',
  styleUrls: ['./company-logos.component.scss']
})
export class CompanyLogosComponent implements OnInit {
  logos = [
    { src: 'assets/loghiCompany/BNL.png', alt: 'BNL' },
    { src: 'assets/loghiCompany/BVTech.png', alt: 'BVTech' },
    { src: 'assets/loghiCompany/EulerHermes.png', alt: 'EulerHermes' },
    { src: 'assets/loghiCompany/INPS.png', alt: 'INPS' },
    { src: 'assets/loghiCompany/Invitalia.png', alt: 'Invitalia' },
    { src: 'assets/loghiCompany/ISS.png', alt: 'ISS' },
    { src: 'assets/loghiCompany/ministeroDellaSalute.png', alt: 'Ministero Della Salute' },
    { src: 'assets/loghiCompany/pon.png', alt: 'pon' },
    { src: 'assets/loghiCompany/PosteItaliane.png', alt: 'Poste Italiane' },
    { src: 'assets/loghiCompany/Reply.png', alt: 'Reply' },
    { src: 'assets/loghiCompany/telecom.png', alt: 'telecom' },
    { src: 'assets/loghiCompany/ThalesAlenia.png', alt: 'ThalesAlenia' },
    { src: 'assets/loghiCompany/Accenture.png', alt: 'Accenture' },
    { src: 'assets/loghiCompany/Aruba.png', alt: 'Aruba' },
    { src: 'assets/loghiCompany/Avanade.png', alt: 'Avanade' },
    { src: 'assets/loghiCompany/Bulgari.png', alt: 'Bulgari' },
    { src: 'assets/loghiCompany/EdenRed.png', alt: 'EdenRed' },
    { src: 'assets/loghiCompany/Fincons.png', alt: 'Fincons' },
    { src: 'assets/loghiCompany/GSE.png', alt: 'GSE' },
    { src: 'assets/loghiCompany/Hyntelo.png', alt: 'Hyntelo' },
    { src: 'assets/loghiCompany/Barilla.png', alt: 'Barilla' },
    { src: 'assets/loghiCompany/Microgame.png', alt: 'Microgame' },
    { src: 'assets/loghiCompany/EdenRed.png', alt: 'EdenRed' },
    { src: 'assets/loghiCompany/Prometeia.png', alt: 'Prometeia' }
  ];

  logosPerSlide: number = 4;
  currentSlideIndex: number = 0;
  slides: any[][] = [];

  ngOnInit(): void {
    this.setLogosPerSlide();
    this.slides = this.getSlides();
  }

  getSlides(): any[][] {
    const slides = [];
    for (let i = 0; i < this.logos.length; i += this.logosPerSlide) {
      slides.push(this.logos.slice(i, i + this.logosPerSlide));
    }
    return slides;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setLogosPerSlide();
    this.slides = this.getSlides();
    this.currentSlideIndex = 0; // Reset to the first slide on resize
  }

  private setLogosPerSlide() {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.logosPerSlide = 8;
    } else if (width >= 992) {
      this.logosPerSlide = 3;
    } else if (width >= 768) {
      this.logosPerSlide = 2;
    } else {
      this.logosPerSlide = 1;
    }
  }
}