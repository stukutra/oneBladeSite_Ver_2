import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form-azienda',
  templateUrl: './contact-form-azienda.component.html',
  styleUrls: ['./contact-form-azienda.component.scss']
})
export class ContactFormAziendaComponent {
  model: any = {
    name: '',
    telephone: '',
    email: '',
    vat: '',
    applicationType: ''
  };
  fileError: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isModalVisible: boolean = false;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.translate.get('FORM.VALIDATION_ERROR').subscribe((res: string) => {
        this.errorMessage = res;
      });
      this.translate.get('FORM.FILE_REQUIRED').subscribe((res: string) => {
        this.fileError = this.model.file ? null : res;
      });
      this.showModal('errorModal');  // Mostra la modale di errore
      return;
    }

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('vat', this.model.vat);
    formData.append('applicationType', this.model.applicationType);
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');

    this.http.post('https://www.oneblade.it/sendEmailSenzaAllegato.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.translate.get('FORM.SUCCESS_MESSAGE').subscribe((res: string) => {
            this.successMessage = res;
          });
          this.errorMessage = null;
          this.fileError = null;  // Cancella il messaggio di errore del file
          this.resetForm(form);  // Resetta il form
          this.showModal('successModal');  // Mostra la modale di successo
        } else {
          this.errorMessage = response.message || this.translate.instant('FORM.SUBMISSION_ERROR');
          this.successMessage = null;
          this.showModal('errorModal');  // Mostra la modale di errore
        }
      },
      (error) => {
        this.translate.get('FORM.SERVER_ERROR').subscribe((res: string) => {
          this.errorMessage = res;
        });
        this.successMessage = null;
        this.showModal('errorModal');  // Mostra la modale di errore
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();  // Resetta i campi del modulo

    // Resetta manualmente il campo file
    this.model.file = null;
  }

  showModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  openQuestionnaireModal() {
    this.isModalVisible = true; // Mostra la modale del questionario
  }
}
