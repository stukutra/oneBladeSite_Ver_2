import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Guide } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/service/guide.service';

@Component({
  selector: 'app-guideList',
  templateUrl: './guideList.component.html',
  styleUrls: ['./guideList.component.scss']
})
export class GuideListComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,private guidesService:GuideService) { }
  guides: Guide[] = [];
  ngOnInit(): void {
    this.loadGuides();

    // 🔹 Ricarica la pagina quando cambia la route
    this.route.params.subscribe(() => {
      this.loadGuides();
    });
  }
  
  loadGuides(): void {
    this.guidesService.getGuides().subscribe(data => {
      this.guides = data;
    });
  }


  openGuide(guide: Guide): void {
    const guideUrl = '/guideAccademy/' + guide.title.toLowerCase().replace(/\s+/g, '-');
    
    // 🔹 Se la stessa route viene aperta, forziamo il ricaricamento
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([guideUrl]);
    });
  }
  
}
