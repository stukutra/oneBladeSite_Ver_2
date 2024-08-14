import { Component } from '@angular/core';

@Component({
  selector: 'app-company-logos',
  templateUrl: './company-logos.component.html',
  styleUrls: ['./company-logos.component.scss']
})
export class CompanyLogosComponent {
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
    { src: 'assets/loghiCompany/ThalesAlenia.png', alt: 'Logo 12' },
    // Add more logos here
  ];
}