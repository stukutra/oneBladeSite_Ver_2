import { RouterModule, Routes } from '@angular/router';

import { AccademyonebladeComponent } from './pages/accademyoneblade/accademyoneblade.component';
import { GuideAccademyDetailsComponent } from './pages/guideAccademyDetails/guideAccademyDetails.component';
import { GuideaccademyComponent } from './pages/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'home', component: HomeComponent },
  { path: 'questionario', component: QuestionnaireComponent },
  { path: 'accademy', component: AccademyonebladeComponent },
  { path: 'guideAccademy', component: GuideaccademyComponent },
  { path: 'guideAccademy/:title', component: GuideAccademyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }