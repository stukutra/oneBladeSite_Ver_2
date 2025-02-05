import { RouterModule, Routes } from '@angular/router';

import { AccademyDetailsComponent } from './pages/accademy/accademyDetails/accademyDetails.component';
import { AccademyonebladeComponent } from './pages/accademy/accademyoneblade/accademyoneblade.component';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAccademyDetails/guideAccademyDetails.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'home', component: HomeComponent },
  { path: 'questionario', component: QuestionnaireComponent },
  { path: 'accademy', component: AccademyonebladeComponent },
  { path: 'AccademyDetails/:id', component: AccademyDetailsComponent },
  { path: 'guideAccademy', component: GuideaccademyComponent },
  { path: 'guideAccademy/:title', component: GuideAccademyDetailsComponent },
  { path: 'softwarehouse', component: SoftwareHouseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }