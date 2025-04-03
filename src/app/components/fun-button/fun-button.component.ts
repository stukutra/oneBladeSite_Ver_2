import { Component } from '@angular/core';
import data from '../../../assets/fun-data.json';

@Component({
    selector: 'app-fun-button',
    templateUrl: './fun-button.component.html',
    styleUrls: ['./fun-button.component.scss']
})
export class FunButtonComponent {
    output: { type: string; value: string } | null = null;
    fadeOut = false;
    private timer: any; // Variabile per gestire il timer

    onButtonClick() {
        const randomEvent = data[Math.floor(Math.random() * data.length)];

        // Se c'è un messaggio attivo, interrompi il timer e sostituisci il messaggio
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.output = randomEvent;
        this.fadeOut = false;

        // Nascondi il messaggio con fade-out dopo 5 secondi
        this.timer = setTimeout(() => {
            this.fadeOut = true;
            setTimeout(() => {
                this.output = null;
            }, 500); // Tempo per completare il fade-out
        }, 5000); // Tempo di visualizzazione di 5 secondi
    }
}
