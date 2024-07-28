/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

console.log('environment.production : ',environment.production)
if (environment.production) {
  enableProdMode();
  // remove console.log
  if(window){ 
    window.console.log=function(){}; 
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
