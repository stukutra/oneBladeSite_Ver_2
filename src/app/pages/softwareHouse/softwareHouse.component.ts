import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-softwareHouse',
  templateUrl: './softwareHouse.component.html',
  styleUrls: ['./softwareHouse.component.scss']
})
export class SoftwareHouseComponent implements OnInit {

  constructor() { }
  showIframe = false; // Nascondiamo inizialmente l'iframe

  toggleIframe(): void {
    this.showIframe = !this.showIframe;
  }
  
  ngOnInit() {
  }

}
