import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { LoadingService } from './components/loading.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'oneBlade';

  constructor(public loadingService: LoadingService, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.showLoadingUntilPageLoad();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log("Benvenuto! Sappiamo che stai dando un'occhiata al nostro codice. Buona esplorazione!");
  }

  private showLoadingUntilPageLoad() {
    this.loadingService.show();
    window.addEventListener('load', () => {
      this.ngZone.run(() => {
        this.loadingService.hide();
        this.cdr.detectChanges();
      });
    });
  }

  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData['animation'] : '';
  }

  // Esempio di utilizzo del servizio di caricamento
  someMethod() {
    this.loadingService.show();
    this.ngZone.run(() => {
      this.loadingService.hide();
      this.cdr.detectChanges();
    });
  }
}