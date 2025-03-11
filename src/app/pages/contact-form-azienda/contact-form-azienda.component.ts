import { Category, Talent } from 'src/app/models/talent.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ContactFormModel } from 'src/app/models/contact-form.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TalentService } from 'src/app/service/talent.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form-azienda',
  templateUrl: './contact-form-azienda.component.html',
  styleUrls: ['./contact-form-azienda.component.scss']
})
export class ContactFormAziendaComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string | null = null;
  @Input() selectedTalent: Talent | null = null; // Aggiungi questa linea
  @Input() customTitle: string | null = null;
  @Input() customSubtitle: string | null = null;
  @Output() emailSent = new EventEmitter<boolean>(); // Aggiungi questa linea
  categories: Category[] = [];
  model: ContactFormModel = {
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
  isContactFormAzienda: boolean = true;
  step: number = 1;

  constructor(private http: HttpClient, private translate: TranslateService, private talentService: TalentService) { }

  ngOnInit() {
    this.talentService.getTalents().subscribe(data => {
      this.categories = data.categories;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] && this.selectedCategory) {
      this.model.applicationType = this.selectedCategory;
    }
  }

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
    if (this.model.file) {
      formData.append('file', this.model.file);
    }
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');

    // Aggiungi i dettagli del talento selezionato se presenti
    if (this.selectedTalent) {
      formData.append('selectedTalent', JSON.stringify(this.selectedTalent));
    }

    this.http.post('https://www.oneblade.it/sendEmailSenzaAllegato.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.translate.get('FORM.SUCCESS_MESSAGE').subscribe((res: string) => {
            this.successMessage = res;
          });
          this.errorMessage = null;
          this.fileError = null;  // Cancella il messaggio di errore del file
          this.resetForm(form);  // Resetta il form
          this.step = 4;  // Passa allo step 4
          if (this.isContactFormAzienda && this.step !== 4) {
            // Prevent the success modal from showing
            return;
          }
          this.showModal('successModal');  // Mostra la modale di successo
          this.emailSent.emit(true); // Emetti l'evento di successo
        } else {
          this.errorMessage = response.message || this.translate.instant('FORM.SUBMISSION_ERROR');
          this.successMessage = null;
          this.showModal('errorModal');  // Mostra la modale di errore
          this.emailSent.emit(false); // Emetti l'evento di errore
        }
      },
      (error) => {
        this.translate.get('FORM.SERVER_ERROR').subscribe((res: string) => {
          this.errorMessage = res;
        });
        this.successMessage = null;
        this.showModal('errorModal');  // Mostra la modale di errore
        this.emailSent.emit(false); // Emetti l'evento di errore
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