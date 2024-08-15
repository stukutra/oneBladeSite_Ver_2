import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-image-text',
  templateUrl: './circular-image-text.component.html',
  styleUrls: ['./circular-image-text.component.scss']
})
export class CircularImageTextComponent {
  @Input() imagePosition?: string;
  @Input() imageUrl: string = '';
  @Input() headline: string = 'Title Text';
  @Input() description: string = 'This is the text describing the content. You can add more details here.';
  @Input() buttonLink: string = '#';
  @Input() buttonText: string = 'Call to Action';
}
