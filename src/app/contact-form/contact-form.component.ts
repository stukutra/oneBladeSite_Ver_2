import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  model: any = {
    name: '',
    telephone: '',
    email: '',
    vat: '',
    applicationType: '',
    file: null
  };
  fileError: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.size > 3 * 1024 * 1024) { // Controlla se il file è più grande di 3MB
      this.fileError = 'Il file supera la dimensione di 3 MB.';
      this.model.file = null;
    } else {
      this.fileError = null;
      this.model.file = file;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.model.file) {
      this.errorMessage = 'Per favore, compila tutti i campi richiesti e carica un file valido.';
      this.showModal('errorModal');  // Mostra la modale di errore
      return;
    }

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('vat', this.model.vat);
    formData.append('applicationType', this.model.applicationType);
    formData.append('file', this.model.file);
   
    this.http.post('https://www.oneblade.it/sendEmail.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.successMessage = 'La tua candidatura è stata inviata con successo!';
          this.errorMessage = null;
          this.resetForm(form);  // Resetta il form
          this.showModal('successModal');  // Mostra la modale di successo
        } else {
          this.errorMessage = response.message || 'Si è verificato un errore durante l\'invio della candidatura.';
          this.successMessage = null;
          this.showModal('errorModal');  // Mostra la modale di errore
        }
      },
      (error) => {
        this.errorMessage = 'Si è verificato un errore durante la comunicazione con il server.';
        this.successMessage = null;
        this.showModal('errorModal');  // Mostra la modale di errore
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();  // Resetta i campi del modulo

    // Resetta manualmente il campo file
    this.model.file = null;

    // Se stai usando un input file nel template, resetta anche il valore dell'elemento DOM
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
