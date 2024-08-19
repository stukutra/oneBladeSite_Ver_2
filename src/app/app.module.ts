import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { BrowserModule } from '@angular/platform-browser';
import { CompanyDescriptionComponent } from './company-description/company-description.component';
import { CompanyLogosComponent } from './company-logos/company-logos.component';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { YourTeamComponent } from './your-team/your-team.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { CircularImageTextComponent } from './circular-image-text/circular-image-text.component';
import { FullBackgroundComponent } from './full-background/full-background.component';
import { AppContactAziendeComponent } from './app-contact-aziende/app-contact-aziende.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
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
    AppContactAziendeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Aggiungi BrowserAnimationsModule
    AppRoutingModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }