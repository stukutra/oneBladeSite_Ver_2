import { animate, style, transition, trigger } from '@angular/animations';

import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'your-app';

  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData['animation'] : '';
  }
}