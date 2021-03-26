import {
  ApplicationConfig,
  importProvidersFrom,
  NgZone,
  ɵNoopNgZone,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NgZone, useClass: ɵNoopNgZone },
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(HttpClientModule),
  ],
};
