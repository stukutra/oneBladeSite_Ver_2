import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-academyReservation',
  templateUrl: './academyReservation.component.html',
  styleUrls: ['./academyReservation.component.scss']
})
export class AcademyReservationComponent implements OnInit {
  public isopenPrivacyPolicyModalModalVisible: boolean = false;
  model: any = {
    name: '',
    telephone: '',
    email: '',
    course: '',
    privacy1: false, // Default false per il checkbox obbligatorio
    privacy2: false  // Default false per il checkbox facoltativo
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.model.course = courseId;
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log('Modello al submit:', this.model);
    console.log('Valore privacy1:', this.model.privacy1);
    console.log('Valore privacy2:', this.model.privacy2);

    if (form.invalid) {
      this.showModal('Errore', 'Per favore, compila tutti i campi richiesti.');
      return;
    }

    if (this.model.privacy1 !== true && this.model.privacy1 !== 'true') {
      this.showModal('Errore', 'Devi autorizzare il trattamento dei dati personali per procedere.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('course', this.model.course);
    formData.append('privacy1', this.model.privacy1 ? 'true' : 'false'); // Converte il booleano in stringa
    formData.append('privacy2', this.model.privacy2 ? 'true' : 'false'); // Converte il booleano in stringa
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');

    this.http.post('https://www.oneblade.it/sendEmailReservation.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.showModal('Successo', 'La richiesta di partecipazione al corso è stata inviata con successo!');
          this.resetForm(form);
        } else {
          this.showModal('Errore', response.message || 'Si è verificato un errore, si prega di riprovare.');
        }
      },
      (error: any) => {
        console.error('Error during the request:', error);
        this.showModal('Errore', 'Si è verificato un errore durante la comunicazione con il server.');
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

  public openPrivacyPolicyModal() {
    this.isopenPrivacyPolicyModalModalVisible = true;
  }

  public closePrivacyPolicyModal(): void {
    this.isopenPrivacyPolicyModalModalVisible = false;
  }
}