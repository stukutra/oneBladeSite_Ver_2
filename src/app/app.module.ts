import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AccademyBannerComponent } from './pages/accademy/accademyBanner/accademyBanner.component';
import { AccademyCaroselComponent } from './pages/accademy/accademyCarosel/accademyCarosel.component';
import { AccademyDetailsComponent } from './pages/accademy/accademyDetails/accademyDetails.component';
import { AccademyonebladeComponent } from './pages/accademy/accademyoneblade/accademyoneblade.component';
import { AgencyDetailsComponent } from './pages/agencyDetails/agencyDetails.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyDescriptionComponent } from './pages/company-description/company-description.component';
import { CompanyLogosComponent } from './pages/company-logos/company-logos.component';
import { ContactFormAziendaComponent } from './pages/contact-form-azienda/contact-form-azienda.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { FissaUnaCallComponent } from './pages/FissaUnaCall/FissaUnaCall.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAccademyDetails/guideAccademyDetails.component';
import { GuideBannerTopComponent } from './pages/guide/guideBannerTop/guideBannerTop.component';
import { GuideListComponent } from './pages/guide/guideList/guideList.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ImageCarouselComponent } from './pages/image-carousel/image-carousel.component';
import { InfooneBladeComponent } from './pages/infooneBlade/infooneBlade.component';
import { MyInformationComponent } from './pages/myInformation/myInformation.component';
import { ParallaxComponent } from './pages/parallax/parallax.component';
import { Privacy_policyComponent } from './pages/privacy_policy/privacy_policy.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    QuestionnaireComponent,
    Privacy_policyComponent,
    AgencyDetailsComponent,
    MyInformationComponent,
    AccademyCaroselComponent,
    AccademyonebladeComponent,
    GuideaccademyComponent,
    GuideAccademyDetailsComponent,
    GuideBannerTopComponent,
    GuideListComponent,
    InfooneBladeComponent,
    AccademyBannerComponent,
    AccademyDetailsComponent,
    SoftwareHouseComponent,
    FissaUnaCallComponent
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