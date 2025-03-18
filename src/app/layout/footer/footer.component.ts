import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  public currentYear: number;
  public isopenPrivacyPolicyModalModalVisible: boolean=false;

  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear(); // Ottieni l'anno corrente dinamicamente
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
