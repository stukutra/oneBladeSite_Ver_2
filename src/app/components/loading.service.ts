import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private componentsLoadingCount = 0;

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  incrementLoading() {
    this.componentsLoadingCount++;
    this.show();
  }

  decrementLoading() {
    this.componentsLoadingCount--;
    if (this.componentsLoadingCount <= 0) {
      this.hide();
    }
  }
}
