import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Guide } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/service/guide.service';

@Component({
  selector: 'app-guideAccademyDetails',
  templateUrl: './guideAccademyDetails.component.html',
  styleUrls: ['./guideAccademyDetails.component.scss']
})
export class GuideAccademyDetailsComponent implements OnInit {
  guide$!: Observable<Guide | undefined>; 
  constructor(private route: ActivatedRoute, private guideService: GuideService) { }

  ngOnInit(): void {
    const guideTitle = this.route.snapshot.paramMap.get('title');

    console.log('Titolo ricevuto dalla URL:', guideTitle); // 🔍 Debug

    if (guideTitle) {
      this.guide$ = this.guideService.getGuideByTitle(guideTitle).pipe(
        catchError(error => {
          console.error('Errore nel caricamento della guida:', error); // 🔍 Debug
          return of(undefined);
        })
      );
    } else {
      console.error('Nessun titolo di guida trovato nella URL!'); // 🔍 Debug
    }
  }
}
