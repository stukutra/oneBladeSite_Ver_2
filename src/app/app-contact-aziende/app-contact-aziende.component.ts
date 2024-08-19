import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-aziende',
  templateUrl: './app-contact-aziende.component.html',
  styleUrls: ['./app-contact-aziende.component.scss']
})
export class AppContactAziendeComponent {
  model = {
    name: '',
    telephone: '',
    email: '',
    company: '',
    message: '',
    option1: '', // Aggiungi la proprietà qui
    option2: '', // Aggiungi altre opzioni se necessario
    option3: '',  // Aggiungi altre opzioni se necessario,
    checkbox1:false,
    checkbox2:false,
  };

  companyOptions = ['Azienda 1', 'Azienda 2', 'Azienda 3'];
  errorMessage: string | null = null;

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Gestione della sottomissione del modulo
      console.log('Form submitted:', this.model);
    } else {
      // Mostra i messaggi di errore per i campi non validi
      this.errorMessage = 'Per favore, completa tutti i campi richiesti.';
    }
  }

  onReset() {
    this.model = {
      name: '',
      telephone: '',
      email: '',
      company: '',
      message: '',
      option1: '', // Aggiungi la proprietà qui
      option2: '', // Aggiungi altre opzioni se necessario
      option3: '',  // Aggiungi altre opzioni se necessario
      checkbox1:false,
    checkbox2:false
    };
    this.errorMessage = null;
  }
}