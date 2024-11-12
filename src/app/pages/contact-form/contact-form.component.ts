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
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private http: HttpClient) { }

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
      this.fileError = this.model.file ? null : 'Il file è richiesto';
      this.showModal('Errore', this.errorMessage);
      return;
    }

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('vat', this.model.vat);
    formData.append('applicationType', this.model.applicationType);
    formData.append('file', this.model.file);
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');

    this.http.post('https://www.oneblade.it/sendEmail.php', formData).subscribe(
      (response: any) => {
        console.log('Server response:', response);  //
        if (response.status === 'success') {
          this.showModal('Successo', 'La tua candidatura è stata inviata con successo!');
          this.resetForm(form);
        } else {
          this.showModal('Errore', response.message || 'Si è verificato un errore.');
        }
      },
      (error: any) => {
        console.error('Error during the request:', error);  // Debug per vedere l'errore
        this.showModal('Errore', 'Si è verificato un errore durante la comunicazione con il server.');
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

  showModal(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  openQuestionnaireModal() {
    this.isModalVisible = true; // Mostra la modale del questionario
  }
}
