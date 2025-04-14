import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AcademyBannerComponent } from './pages/academy/academyBanner/academyBanner.component';
import { AcademyCaroselComponent } from './pages/academy/academyCarosel/academyCarosel.component';
import { AcademyDetailsComponent } from './pages/academy/academyDetails/academyDetails.component';
import { AcademyEndorserBannerComponent } from './pages/academy/academyEndorserBanner/academyEndorserBanner.component';
import { AcademyFAQComponent } from './pages/academy/academyFAQ/academyFAQ.component';
import { AcademyFundingComponent } from './pages/academy/academyFunding/academyFunding.component';
import { AcademyReservationComponent } from './pages/academy/academyReservation/academyReservation.component';
import { AcademyonebladeComponent } from './pages/academy/academyoneblade/academyoneblade.component';
import { AgencyDetailsComponent } from './pages/agencyDetails/agencyDetails.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogCategoriesComponent } from './blog/blog-categories.component';
import { BlogComponent } from './blog/blog.component';
import { BoxProductComponent } from './components/boxProduct/boxProduct.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CompanyAboutUsComponent } from './pages/company/companyAboutUs/companyAboutUs.component';
import { CompanyDescriptionComponent } from './pages/company/company-description/company-description.component';
import { CompanyLogosComponent } from './pages/company/company-logos/company-logos.component';
import { ContactFormAziendaComponent } from './pages/contact-form-azienda/contact-form-azienda.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { CustomSoftwareComponent } from './pages/customSoftware/customSoftware.component';
import { FissaUnaCallComponent } from './pages/FissaUnaCall/FissaUnaCall.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FunButtonComponent } from './components/fun-button/fun-button.component';
import { GuideAccademyDetailsComponent } from './pages/guide/guideAcademyDetails/guideAcademyDetails.component';
import { GuideBannerTopComponent } from './pages/guide/guideBannerTop/guideBannerTop.component';
import { GuideListComponent } from './pages/guide/guideList/guideList.component';
import { GuideaccademyComponent } from './pages/guide/guideaccademy/guideaccademy.component';
import { HomeComponent } from './layout/home/home.component';
import { ImageCarouselComponent } from './pages/image-carousel/image-carousel.component';
import { InfooneBladeComponent } from './pages/infooneBlade/infooneBlade.component';
import { InfyBladeSuiteComponent } from './pages/Products/InfyBladeSuite/InfyBladeSuite.component';
import { ItalianDatePipe } from './pipes/italian-date.pipe';
import { LoadingComponent } from './components/loading.component';
import { LoadingService } from './components/loading.service';
import { LoginComponent } from './auth/login/login.component';
import { MyInformationComponent } from './pages/myInformation/myInformation.component';
import { MyNewsoneBladeComponent } from './myNewsoneBlade/myNewsoneBlade.component';
import { OneBladeVideoComponent } from './components/oneBladeVideo/oneBladeVideo.component';
import { OutsourcingBannerComponent } from './pages/outsourcing/outsourcingBanner/outsourcingBanner.component';
import { OutsourcingInfoComponent } from './pages/outsourcing/outsourcingInfo/outsourcingInfo.component';
import { ParallaxComponent } from './pages/parallax/parallax.component';
import { PartnersOneBladeComponent } from './pages/partnersOneBlade/partnersOneBlade.component';
import { PrivacyPolicyComponent } from './pages/privacy_policy/privacy_policy.component';
import { ProductsoneBladeComponent } from './pages/productsoneBlade/productsoneBlade.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegistrationFormUserComponent } from './user/registrationFormUser/registrationFormUser.component';
import { SoftwareHouseComponent } from './pages/softwareHouse/softwareHouse.component';
import { StacksComponent } from './pages/stacks/stacks.component';
import { TalentWizardComponent } from './pages/outsourcing/TalentWizard/TalentWizard.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WhyoneBladeBannerComponent } from './pages/outsourcing/whyoneBladeBanner/whyoneBladeBanner.component';
import { WhyoneBladeComponent } from './pages/outsourcing/whyoneBlade/whyoneBlade.component';

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
    ContactFormAziendaComponent,
    TalentWizardComponent,
    BlogComponent,
    BlogCategoriesComponent,
    ItalianDatePipe,
    WhyoneBladeComponent,
    WhyoneBladeBannerComponent,
    LoadingComponent,
    MyNewsoneBladeComponent,
    CustomSoftwareComponent,
    FunButtonComponent,
    OneBladeVideoComponent,
    PartnersOneBladeComponent,
    StacksComponent,
    ProductsoneBladeComponent,
    BoxProductComponent,
    InfyBladeSuiteComponent
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
  providers: [LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }