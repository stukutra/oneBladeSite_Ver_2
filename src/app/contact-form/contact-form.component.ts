// contact-form.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  model = {
    name: '',
    telephone: '',
    email: '',
    vat: '',
    applicationType: '',
    file: null
  };

  fileError: string | null = null;
  pdfRequired: boolean = false;
  fileUploaded: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid && this.fileUploaded) {
      // Gestione della sottomissione del modulo
      console.log('Form submitted:', this.model);
    } else {
      // Mostra i messaggi di errore per i campi non validi
      form.control.markAllAsTouched();
      if (!this.fileUploaded) {
        this.pdfRequired = true;
      }
    }
  }

  onReset() {
    this.model = {
      name: '',
      telephone: '',
      email: '',
      vat: '',
      applicationType: '',
      file: null
    };
    this.fileError = null;
    this.pdfRequired = false;
    this.fileUploaded = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // Verifica che il file non superi i 3 MB
        this.fileError = 'File must not exceed 3 MB.';
        this.fileUploaded = false;
      } else {
        this.fileError = null;
        this.fileUploaded = true;
      }
    } else {
      this.fileError = null;
      this.fileUploaded = false;
    }
  }
}