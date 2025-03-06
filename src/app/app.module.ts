import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
// ngx-translate per la localizzazione
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Academy Components
import { AcademyBannerComponent } from './pages/academy/academyBanner/academyBanner.component';
import { AcademyCaroselComponent } from './pages/academy/academyCarosel/academyCarosel.component';
import { AcademyDetailsComponent } from './pages/academy/academyDetails/academyDetails.component';
import { AcademyEndorserBannerComponent } from './pages/academy/academyEndorserBanner/academyEndorserBanner.component';
import { AcademyFAQComponent } from './pages/academy/academyFAQ/academyFAQ.component';
import { AcademyFundingComponent } from './pages/academy/academyFunding/academyFunding.component';
import { AcademyReservationComponent } from './pages/academy/academyReservation/academyReservation.component';
import { AcademyonebladeComponent } from './pages/academy/academyoneblade/academyoneblade.component';
import { AgencyDetailsComponent } from './pages/agencyDetails/agencyDetails.component';
// Layout Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogCategoriesComponent } from './blog/blog-categories.component';
import { BlogComponent } from './blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyAboutUsComponent } from './pages/company/companyAboutUs/companyAboutUs.component';
import { CompanyDescriptionComponent } from './pages/company/company-description/company-description.component';
// Pages Components
import { CompanyLogosComponent } from './pages/company/company-logos/company-logos.component';
import { ContactFormAziendaComponent } from './pages/contact-form-azienda/contact-form-azienda.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { FissaUnaCallComponent } from './pages/FissaUnaCall/FissaUnaCall.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
// Guide Components
import { GuideAccademyDetailsComponent } from './pages/guide/guideAcademyDetails/guideAcademyDetails.component';
import { GuideBannerTopComponent } from './pages/guide/guideBannerTop/guideBannerTop.component';
import { GuideListComponent } from './pages/guide/guideList/guideList.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { ImageCarouselComponent } from './pages/image-carousel/image-carousel.component';
import { InfooneBladeComponent } from './pages/infooneBlade/infooneBlade.component';
import { LoginComponent } from './auth/login/login.component';
import { MyInformationComponent } from './pages/myInformation/myInformation.component';
// Outsourcing Components
import { OutsourcingBannerComponent } from './pages/outsourcing/outsourcingBanner/outsourcingBanner.component';
import { OutsourcingInfoComponent } from './pages/outsourcing/outsourcingInfo/outsourcingInfo.component';
import { ParallaxComponent } from './pages/parallax/parallax.component';
import { PrivacyPolicyComponent } from './pages/privacy_policy/privacy_policy.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegistrationFormUserComponent } from './user/registrationFormUser/registrationFormUser.component';
// Software House & Call Components
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';
import { TalentListComponent } from './pages/outsourcing/TalentList/TalentList.component';
import { TalentWizardComponent } from './pages/outsourcing/TalentWizard/TalentWizard.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Funzione per caricare i file di traduzione
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
    QuestionnaireComponent,
    PrivacyPolicyComponent,
    AgencyDetailsComponent,
    MyInformationComponent,
    ImageCarouselComponent,
    ParallaxComponent,
    AcademyBannerComponent,
    AcademyCaroselComponent,
    AcademyDetailsComponent,
    AcademyReservationComponent,
    AcademyonebladeComponent,
    GuideaccademyComponent,
    GuideAccademyDetailsComponent,
    GuideBannerTopComponent,
    GuideListComponent,
    OutsourcingBannerComponent,
    OutsourcingInfoComponent,
    SoftwareHouseComponent,
    FissaUnaCallComponent,
    InfooneBladeComponent,
    AcademyEndorserBannerComponent,
    CompanyAboutUsComponent,
    AcademyFAQComponent,
    RegistrationFormUserComponent,
    AcademyFundingComponent,
    LoginComponent,
    RegisterComponent,
    TalentListComponent,
    ContactFormAziendaComponent,
    TalentWizardComponent,
    BlogComponent,
    BlogCategoriesComponent
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