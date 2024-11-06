import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-logos',
  templateUrl: './company-logos.component.html',
  styleUrls: ['./company-logos.component.scss']
})
export class CompanyLogosComponent implements OnInit {
  logos = [
    { src: 'assets/loghiCompany/BNL.png', alt: 'Logo 1' },
    { src: 'assets/loghiCompany/BVTech.png', alt: 'Logo 2' },
    { src: 'assets/loghiCompany/EulerHermes.png', alt: 'Logo 3' },
    { src: 'assets/loghiCompany/INPS.png', alt: 'Logo 4' },
    { src: 'assets/loghiCompany/Invitalia.png', alt: 'Logo 5' },
    { src: 'assets/loghiCompany/ISS.png', alt: 'Logo 6' },
    { src: 'assets/loghiCompany/ministeroDellaSalute.png', alt: 'Logo 7' },
    { src: 'assets/loghiCompany/pon.png', alt: 'Logo 8' },
    { src: 'assets/loghiCompany/PosteItaliane.png', alt: 'Logo 9' },
    { src: 'assets/loghiCompany/Reply.png', alt: 'Logo 10' },
    { src: 'assets/loghiCompany/telecom.png', alt: 'Logo 11' },
    { src: 'assets/loghiCompany/ThalesAlenia.png', alt: 'Logo 12' }
  ];

  logosPerSlide: number = 4;

  ngOnInit(): void {
    // Imposta il valore iniziale per i loghi per slide
    this.setLogosPerSlide();
  }

  getSlides(): any[][] {
    const slides = [];
    for (let i = 0; i < this.logos.length; i += this.logosPerSlide) {
      slides.push(this.logos.slice(i, i + this.logosPerSlide));
    }
    return slides;
  }

  private setLogosPerSlide() {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.logosPerSlide = 4;
    } else if (width >= 992) {
      this.logosPerSlide = 3;
    } else if (width >= 768) {
      this.logosPerSlide = 2;
    } else {
      this.logosPerSlide = 1;
    }
  }
}