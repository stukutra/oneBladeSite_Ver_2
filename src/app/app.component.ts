declare var gtag: Function;

import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  constructor(
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.showLoadingUntilPageLoad();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log("Benvenuto! Sappiamo che stai dando un'occhiata al nostro codice. Buona esplorazione!");

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        //console.log(`Navigated to: ${url}`); // Debug

        // Invia il percorso aggiornato a Google Analytics
        if (typeof gtag === 'function') {
          gtag('config', 'G-67PMJZ4ZRH', { page_path: url });
        }
      }
    });
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