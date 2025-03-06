import { RouterModule, Routes } from '@angular/router';

import { AcademyDetailsComponent } from './pages/academy/academyDetails/academyDetails.component';
import { AcademyFAQComponent } from './pages/academy/academyFAQ/academyFAQ.component';
import { AcademyonebladeComponent } from './pages/academy/academyoneblade/academyoneblade.component';
import { BlogCategoriesComponent } from './blog/blog-categories.component';
import { BlogComponent } from './blog/blog.component';
import { CompanyAboutUsComponent } from './pages/company/companyAboutUs/companyAboutUs.component';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAcademyDetails/guideAcademyDetails.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { OutsourcingInfoComponent } from './pages/outsourcing/outsourcingInfo/outsourcingInfo.component';
import { PrivacyPolicyComponent } from './pages/privacy_policy/privacy_policy.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { RegisterComponent } from './auth/register/register.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';
import { TalentListComponent } from './pages/outsourcing/TalentList/TalentList.component';
import { TalentWizardComponent } from './pages/outsourcing/TalentWizard/TalentWizard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'home', component: HomeComponent },
  { path: 'questionario', component: QuestionnaireComponent },
  { path: 'accademy', component: AcademyonebladeComponent },
  { path: 'AcademyDetails/:id', component: AcademyDetailsComponent },
  { path: 'guideAccademy', component: GuideaccademyComponent },
  { path: 'guideAccademy/:title', component: GuideAccademyDetailsComponent },
  { path: 'softwarehouse', component: SoftwareHouseComponent },
  { path: 'outsourcinginfo', component: OutsourcingInfoComponent },
  { path: 'aboutus', component: CompanyAboutUsComponent },
  { path: 'academyFAQ', component: AcademyFAQComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'talent', component: TalentListComponent },
  { path: 'talentWizard', component: TalentWizardComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'blog', component: BlogCategoriesComponent },
  { path: 'blog/:category', component: BlogComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }