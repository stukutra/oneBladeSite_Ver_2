import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { AcademyFundingComponent } from '../academyFunding/academyFunding.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { RegionsService } from '../../../service/Regions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-academyReservation',
  templateUrl: './academyReservation.component.html',
  styleUrls: ['./academyReservation.component.scss']
})
export class AcademyReservationComponent implements OnInit {
  @ViewChild(AcademyFundingComponent) academyFundingComponent!: AcademyFundingComponent;
  @Output() regionChange = new EventEmitter<number>();
  public isopenPrivacyPolicyModalModalVisible: boolean = false;
  model: any = {
    name: '',
    telephone: '',
    email: '',
    course: '',
    region: '', // New field for region
    privacy1: false, // Default false per il checkbox obbligatorio
    privacy2: false  // Default false per il checkbox facoltativo
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isModalVisible: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  regions: any[] = []; // Array to hold regions

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private regionsService: RegionsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.model.course = courseId;
      }
    });

    // Fetch regions
    this.regionsService.getRegions().subscribe(data => {
      this.regions = data.regioni;
    });
  }

  onRegionChange() {
    console.log('Region changed:', this.model.region);
    this.regionChange.emit(Number(this.model.region));
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted with model:', this.model);
    console.log('Valore privacy1:', this.model.privacy1);
    console.log('Valore privacy2:', this.model.privacy2);

    if (form.invalid) {
      this.translate.get('FORM.VALIDATION_ERROR').subscribe((res: string) => {
        this.showModal('Errore', res);
      });
      return;
    }

    if (this.model.privacy1 !== true && this.model.privacy1 !== 'true') {
      this.translate.get('FORM.PRIVACY_ERROR').subscribe((res: string) => {
        this.showModal('Errore', res);
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('telephone', this.model.telephone);
    formData.append('email', this.model.email);
    formData.append('course', this.model.course);
    formData.append('region', this.model.region); // Append region
    formData.append('privacy1', this.model.privacy1 ? 'true' : 'false'); // Converte il booleano in stringa
    formData.append('privacy2', this.model.privacy2 ? 'true' : 'false'); // Converte il booleano in stringa
    formData.append('api_key', '7F3kH#r8!wL5tVxZ2Q9p^nGjR@cM1dP6');

    this.http.post('https://www.oneblade.it/sendEmailReservation.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.translate.get('FORM.SUCCESS_MESSAGE').subscribe((res: string) => {
            this.showModal('Successo', res);
          });
          this.resetForm(form);
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

    if (this.model.region) {
      console.log('Setting idregione in AcademyFundingComponent:', this.model.region);
      this.academyFundingComponent.idregione = Number(this.model.region);
      this.academyFundingComponent.ngOnInit();
    }
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