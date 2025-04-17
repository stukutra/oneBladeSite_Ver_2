import { Component, OnInit } from '@angular/core';

import { Guide } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/service/guide.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guideaccademy',
  templateUrl: './guideaccademy.component.html',
  styleUrls: ['./guideaccademy.component.scss']
})
export class GuideaccademyComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.loadContent();

    // 🔹 Ricarica il contenuto quando cambia la lingua
    this.translate.onLangChange.subscribe(() => {
      this.loadContent();
    });
  }

  loadContent(): void {
    // Logica per caricare il contenuto della pagina
    console.log('Contenuto ricaricato per la lingua:', this.translate.currentLang);
  }
}
