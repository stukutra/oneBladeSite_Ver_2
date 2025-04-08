import { RouterModule, Routes } from '@angular/router';

import { AcademyDetailsComponent } from './pages/academy/academyDetails/academyDetails.component';
import { AcademyFAQComponent } from './pages/academy/academyFAQ/academyFAQ.component';
import { AcademyonebladeComponent } from './pages/academy/academyoneblade/academyoneblade.component';
import { BlogCategoriesComponent } from './blog/blog-categories.component';
import { BlogComponent } from './blog/blog.component';
import { CompanyAboutUsComponent } from './pages/company/companyAboutUs/companyAboutUs.component';
import { CustomSoftwareComponent } from './pages/customSoftware/customSoftware.component';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAcademyDetails/guideAcademyDetails.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MyNewsoneBladeComponent } from './myNewsoneBlade/myNewsoneBlade.component';
import { NgModule } from '@angular/core';
import { OutsourcingInfoComponent } from './pages/outsourcing/outsourcingInfo/outsourcingInfo.component';
import { PrivacyPolicyComponent } from './pages/privacy_policy/privacy_policy.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { RegisterComponent } from './auth/register/register.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';
import { TalentWizardComponent } from './pages/outsourcing/TalentWizard/TalentWizard.component';
import { WhyoneBladeComponent } from './pages/outsourcing/whyoneBlade/whyoneBlade.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'home', component: HomeComponent },
  { path: 'questionario', component: QuestionnaireComponent },
  { path: 'academy', component: AcademyonebladeComponent },
  { path: 'AcademyDetails/:id', component: AcademyDetailsComponent },
  { path: 'guideAccademy', component: GuideaccademyComponent },
  { path: 'guideAccademy/:title', component: GuideAccademyDetailsComponent },
  { path: 'softwarehouse', component: SoftwareHouseComponent },
  { path: 'outsourcinginfo', component: OutsourcingInfoComponent },
  { path: 'aboutus', component: CompanyAboutUsComponent },
  { path: 'academyFAQ', component: AcademyFAQComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'talentWizard', component: TalentWizardComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'blog', component: BlogCategoriesComponent },
  { path: 'blog/:code', component: BlogComponent },
  { path: 'whyoneBlade', component: WhyoneBladeComponent },
  { path: 'myNews', component: MyNewsoneBladeComponent },
  { path: 'customSoftware', component: CustomSoftwareComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true, 
    scrollPositionRestoration: 'enabled' // Ripristina la posizione dello scroll in cima
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }