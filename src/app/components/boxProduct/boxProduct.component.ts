import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-box-product',
    templateUrl: './boxProduct.component.html',
    styleUrls: ['./boxProduct.component.scss']
})
export class BoxProductComponent {
    @Input() title: string = '';
    @Input() content: string = '';
    @Input() logos: { src: string; alt: string }[] = [];
    @Input() link: string = '';
}
