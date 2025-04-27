import { Component } from '@angular/core';
import { Router } from '@angular/router';
import versionData from '../../../assets/data/version.json'; // Importa il default export

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  public currentYear: number;
  public isopenPrivacyPolicyModalModalVisible: boolean = false;
  public version: string; // Aggiungi la proprietà versione

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear(); // Ottieni l'anno corrente dinamicamente
    this.version = versionData.version; // Inizializza la versione
  }

  public openPrivacyPolicyModal() {
    this.isopenPrivacyPolicyModalModalVisible = true;
  }

  public closePrivacyPolicyModal(): void {
    this.isopenPrivacyPolicyModalModalVisible = false;
  }

  public navigateToPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }
}
