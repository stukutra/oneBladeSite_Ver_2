import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/service/Courses.service';

@Component({
  selector: 'app-academyDetails',
  templateUrl: './academyDetails.component.html',
  styleUrls: ['./academyDetails.component.scss']
})
export class AcademyDetailsComponent implements OnInit {
  course: Course | undefined;
  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    this.coursesService.getCourses().subscribe(data => {
      this.course = data.categories
        .flatMap((category: { courses: Course; }) => category.courses)
        .find((course: { idCourse: string | null; }) => course.idCourse === courseId);
    });
  }

  bookCourse() {
    alert("Hai prenotato il corso con codice: " + this.course?.idCourse);
  }

}
