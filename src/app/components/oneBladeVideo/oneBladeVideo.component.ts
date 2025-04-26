import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oneBladeVideo',
  templateUrl: './oneBladeVideo.component.html',
  styleUrls: ['./oneBladeVideo.component.scss']
})
export class OneBladeVideoComponent implements OnInit {
  @Input() videoPath: string = ''; // Aggiunto parametro di input

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
