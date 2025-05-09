import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Guide } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/service/guide.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guideAcademyDetails',
  templateUrl: './guideAcademyDetails.component.html',
  styleUrls: ['./guideAcademyDetails.component.scss']
})
export class GuideAccademyDetailsComponent implements OnInit {
  guide$!: Observable<Guide | undefined>;

  constructor(
    private route: ActivatedRoute,
    private guideService: GuideService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadGuide();

    // 🔹 Ricarica la guida quando cambia la lingua
    this.translate.onLangChange.subscribe(() => {
      this.loadGuide();
    });
  }

  loadGuide(): void {
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
