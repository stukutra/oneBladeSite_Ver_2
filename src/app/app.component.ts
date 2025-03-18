import { AfterViewInit, Component } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  title = 'oneBlade';

  constructor(public loadingService: LoadingService) {}

  ngAfterViewInit() {
    this.showLoadingUntilPageLoad();
  }

  private showLoadingUntilPageLoad() {
    this.loadingService.show();
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loadingService.hide();
      }, 500); // Aggiungi un piccolo ritardo per garantire che il caricamento sia visibile
    });
  }

  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData['animation'] : '';
  }

  // Esempio di utilizzo del servizio di caricamento
  someMethod() {
    this.loadingService.show();
    // ...esegui qualche operazione...
    this.loadingService.hide();
  }
}