import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  isModalVisible: boolean = false; // Per le modali di Errore/Successo
  isQuestionnaireModalVisible: boolean = false; // Per la modale del questionario
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private http: HttpClient, private translate: TranslateService) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.size > 3 * 1024 * 1024) { // Controlla se il file è più grande di 3MB
      this.translate.get('FORM.FILE_TOO_LARGE').subscribe((res: string) => {
        this.fileError = res;
      });
      this.model.file = null;
    } else {
      this.fileError = null;
      this.model.file = file;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.model.file) {
      this.translate.get('FORM.VALIDATION_ERROR').subscribe((res: string) => {
        this.errorMessage = res;
      });
      this.translate.get('FORM.FILE_REQUIRED').subscribe((res: string) => {
        this.fileError = this.model.file ? null : res;
      });
      this.showModal('Errore', this.errorMessage || '');
      return;
    }

    const questionnaireReport = localStorage.getItem('questionnaireReport');
    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('vat', this.model.vat);
    formData.append('applicationType', this.model.applicationType);
    formData.append('file', this.model.file);
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');
    formData.append('questionnaireReport', questionnaireReport || this.translate.instant('FORM.NO_REPORT'));

    this.http.post('https://www.oneblade.it/sendEmail.php', formData).subscribe(
      (response: any) => {
        console.log('Server response:', response);
        if (response.status === 'success') {
          this.translate.get('FORM.SUCCESS_MESSAGE').subscribe((res: string) => {
            this.showModal('Successo', res);
          });
          this.resetForm(form);
          localStorage.removeItem('questionnaireReport');
        } else {
          this.translate.get('FORM.SUBMISSION_ERROR').subscribe((res: string) => {
            this.showModal('Errore', response.message || res);
          });
        }
      },
      (error: any) => {
        console.error('Error during the request:', error);
        this.translate.get('FORM.SERVER_ERROR').subscribe((res: string) => {
          this.showModal('Errore', res);
        });
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.model.file = null;
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
    this.isQuestionnaireModalVisible = true;
  }

  closeQuestionnaireModal(): void {
    this.isQuestionnaireModalVisible = false;
  }
}
