import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="loading$ | async" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
