import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import * as fromApp from './store';
import { TodosEffects } from './todos/store/effects';
import { AppComponent } from './app.component';
import {
  TodoComponent,
  NewTodoComponent,
  TodoListComponent,
  TodoListItemComponent,
  FooterComponent,
} from './todos/components';

const routes: Routes = [
  { path: ':filter', component: TodoComponent },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NewTodoComponent,
    TodoListComponent,
    TodoListItemComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromApp.reducers, {
      metaReducers: fromApp.metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([TodosEffects]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: fromApp.CustomRouterStateSerializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
