import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import localeIt from '@angular/common/locales/it';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeIt, 'it-IT');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
