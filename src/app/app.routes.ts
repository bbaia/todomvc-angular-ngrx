import { Routes } from '@angular/router';

import { TodoComponent } from './todos/containers';

export const routes: Routes = [
  { path: ':filter', component: TodoComponent },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];
