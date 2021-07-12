import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { TodosService } from '../services';
import * as fromTodos from '../store';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodos.loadAction),
      switchMap(action => this.todosService.getTodos()),
      map(todos => fromTodos.loadSuccessAction({ todos })),
      // delay(1000), // Simulate network latency for loading animation
    );
  });

  filter$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromTodos.setFilterAction),
        tap(action => {
          switch (action.filter) {
            case 'SHOW_ACTIVE': {
              this.router.navigate(['/', 'active']);
              break;
            }
            case 'SHOW_COMPLETED': {
              this.router.navigate(['/', 'completed']);
              break;
            }
            default: {
              this.router.navigate(['/', 'all']);
              break;
            }
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private todosService: TodosService,
  ) {}
}
