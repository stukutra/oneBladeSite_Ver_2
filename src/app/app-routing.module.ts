import { RouterModule, Routes } from '@angular/router';

import { AcademyDetailsComponent } from './pages/accademy/academyDetails/academyDetails.component';
import { AcademyonebladeComponent } from './pages/accademy/academyoneblade/academyoneblade.component';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAcademyDetails/guideAcademyDetails.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { OutsourcingInfoComponent } from './pages/outsourcing/outsourcingInfo/outsourcingInfo.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';

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
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }