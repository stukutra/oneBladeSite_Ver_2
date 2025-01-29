import { Component, OnInit } from '@angular/core';

import { Guide } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/service/guide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guideaccademy',
  templateUrl: './guideaccademy.component.html',
  styleUrls: ['./guideaccademy.component.scss']
})
export class GuideaccademyComponent implements OnInit {
  guides: Guide[] = [];
  constructor(private router: Router,private guidesService:GuideService) { }

  ngOnInit(): void {
    this.guidesService.getGuides().subscribe(data => {
      this.guides = data;
      console.log(data);
    });
  }

  openGuide(guide: Guide): void {
    this.router.navigate(['/guideAccademy', guide.title.toLowerCase().replace(/\s+/g, '-')]);
  }

}
