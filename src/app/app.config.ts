import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import * as fromApp from './store';
import { TodosEffects } from './todos/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideStore(fromApp.reducers, {
      metaReducers: fromApp.metaReducers,
    }),
    provideEffects([TodosEffects]),
    provideRouterStore({
      serializer: fromApp.CustomRouterStateSerializer,
    }),
    provideStoreDevtools({
      name: 'TodoMVC app using Angular & NgRx',
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    importProvidersFrom(HttpClientModule),
  ],
};
