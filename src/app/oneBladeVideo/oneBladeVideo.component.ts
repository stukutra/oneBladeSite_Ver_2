import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oneBladeVideo',
  templateUrl: './oneBladeVideo.component.html',
  styleUrls: ['./oneBladeVideo.component.scss']
})
export class OneBladeVideoComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onVideoLoaded(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    if (videoElement) {
      // Imposta il video all'ultimo fotogramma
      videoElement.currentTime = 0.17;
    }
  }
}
