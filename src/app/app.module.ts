import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppContactAziendeComponent } from './app-contact-aziende/app-contact-aziende.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CircularImageTextComponent } from './circular-image-text/circular-image-text.component';
import { CompanyDescriptionComponent } from './company-description/company-description.component';
import { CompanyLogosComponent } from './company-logos/company-logos.component';
import { ContactFormAziendaComponent } from './contact-form-azienda/contact-form-azienda.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FullBackgroundComponent } from './full-background/full-background.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { YourTeamComponent } from './your-team/your-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    FooterComponent,
    CompanyLogosComponent,
    CompanyDescriptionComponent,
    ContactFormComponent,
    RecruitmentComponent,
    YourTeamComponent,
    ImageCarouselComponent,
    ParallaxComponent,
    CircularImageTextComponent,
    FullBackgroundComponent,
    AppContactAziendeComponent,
    ContactFormAziendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Aggiungi BrowserAnimationsModule
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }