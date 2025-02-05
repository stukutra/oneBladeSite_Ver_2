import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-FissaUnaCall',
  templateUrl: './FissaUnaCall.component.html',
  styleUrls: ['./FissaUnaCall.component.scss']
})
export class FissaUnaCallComponent implements OnInit {

  constructor() { }
  showIframe = false; // Nascondiamo inizialmente l'iframe

  toggleIframe(): void {
    this.showIframe = !this.showIframe;
  }
  ngOnInit() {
  }

}
