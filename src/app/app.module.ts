import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import * as fromApp from './store';
import { AppComponent } from './app.component';
import {
  TodoComponent,
  NewTodoComponent,
  TodoListComponent,
  TodoListItemComponent,
  FooterComponent,
} from './todos/components';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
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
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
