import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  swiperConfig = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: true, // Abilita le frecce di navigazione
  };

  logos = [
    { src: 'assets/logo1.png', alt: 'Logo 1' },
    { src: 'assets/logo2.png', alt: 'Logo 2' },
    { src: 'assets/logo3.png', alt: 'Logo 3' },
  ];


  showChat = false;

  toggleChat() {
    this.showChat = !this.showChat;
  }
}