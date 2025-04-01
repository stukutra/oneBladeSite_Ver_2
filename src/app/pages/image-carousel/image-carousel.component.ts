import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { CoursesService } from '../../service/Courses.service';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  link?: string;
}

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private carouselInterval: any; // Store the interval reference
  slides: Slide[] = [
    { title: 'CAROUSEL.SLIDE_1.TITLE', subtitle: 'CAROUSEL.SLIDE_1.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 1' },
    { title: 'CAROUSEL.SLIDE_2.TITLE', subtitle: 'CAROUSEL.SLIDE_2.SUBTITLE', image: './assets/slide/Slide_2.jpg', alt: 'Description of Slide 2' },
    { title: 'CAROUSEL.SLIDE_3.TITLE', subtitle: 'CAROUSEL.SLIDE_3.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 3' }
  ];

  constructor(private coursesService: CoursesService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentSlide = 0; // Ensure the first slide is active immediately
    this.cdr.detectChanges(); // Force Angular to detect changes and render the first slide
    this.startCarousel(); // Start the carousel immediately without delay
    this.loadCourseSlides();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval); // Stop the carousel when the component is destroyed
    }
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Change slide every 3 seconds
  }

  loadCourseSlides() {
    this.coursesService.getCoursesActive().subscribe((data: any) => {
      data.forEach((category: any) => {
        category.courses.forEach((course: any) => {
          let subtitle = course.nature;
          if (subtitle.length > 60) {
            const index = subtitle.lastIndexOf(' ', 60);
            subtitle = subtitle.substring(0, index) + '<br>' + subtitle.substring(index + 1);
          }
          this.slides.push({
            title: "Corso di " + course.title,
            subtitle: subtitle,
            image: './assets/slide/Academy3_OneBlade.jpg',
            alt: `Description of ${course.title}`,
            link: `AcademyDetails/${course.idCourse}`
          });
        });
      });
    });
  }
}