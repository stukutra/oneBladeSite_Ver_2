import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-background',
  templateUrl: './full-background.component.html',
  styleUrls: ['./full-background.component.scss']
})
export class FullBackgroundComponent {
  @Input() overlayImageUrl: string = ''; // URL dell'immagine sovrapposta
  @Input() mainText: string = '';       // Testo principale
}
