import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'questionario', component: QuestionnaireComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }