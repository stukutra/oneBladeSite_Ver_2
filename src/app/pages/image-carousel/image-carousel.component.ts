import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  currentSlide = 0;
  slides = [
    { title: 'CAROUSEL.SLIDE_1.TITLE', subtitle: 'CAROUSEL.SLIDE_1.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 1' },
    { title: 'CAROUSEL.SLIDE_2.TITLE', subtitle: 'CAROUSEL.SLIDE_2.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 2' },
    { title: 'CAROUSEL.SLIDE_3.TITLE', subtitle: 'CAROUSEL.SLIDE_3.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 3' }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Change slide every 3 seconds
  }
}
