import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyDescriptionComponent } from './pages/company-description/company-description.component';
import { CompanyLogosComponent } from './pages/company-logos/company-logos.component';
import { ContactFormAziendaComponent } from './pages/contact-form-azienda/contact-form-azienda.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCarouselComponent } from './pages/image-carousel/image-carousel.component';
import { ParallaxComponent } from './pages/parallax/parallax.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

// Funzione di factory per il TranslateLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    FooterComponent,
    CompanyLogosComponent,
    CompanyDescriptionComponent,
    ContactFormComponent,
    ImageCarouselComponent,
    ParallaxComponent,
    ContactFormAziendaComponent,
    QuestionnaireComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }