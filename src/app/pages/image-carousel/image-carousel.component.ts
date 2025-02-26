import { Component, OnInit } from '@angular/core';

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
export class ImageCarouselComponent implements OnInit {
  currentSlide = 0;
  slides: Slide[] = [
    { title: 'CAROUSEL.SLIDE_1.TITLE', subtitle: 'CAROUSEL.SLIDE_1.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 1' },
    { title: 'CAROUSEL.SLIDE_2.TITLE', subtitle: 'CAROUSEL.SLIDE_2.SUBTITLE', image: './assets/slide/Slide_2.jpg', alt: 'Description of Slide 2' },
    { title: 'CAROUSEL.SLIDE_3.TITLE', subtitle: 'CAROUSEL.SLIDE_3.SUBTITLE', image: './assets/slide/Slide_1.jpg', alt: 'Description of Slide 3' }
  ];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.startCarousel();
    this.loadCourseSlides();
  }

  startCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Change slide every 3 seconds
  }

  loadCourseSlides() {
    this.coursesService.getCoursesActive().subscribe((data: any) => {
      data.forEach((category: any) => {
        category.courses.forEach((course: any) => {
          this.slides.push({
            title: "Corso di " + course.title,
            subtitle: course.nature,
            image: './assets/slide/Slide_1.jpg', // Use a default image or course-specific image if available
            alt: `Description of ${course.title}`,
            link: `AcademyDetails/${course.idCourse}`
          });
        });
      });
    });
  }
}