import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of as observableOf } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import * as fromTodos from '../store';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodos.loadAction),
      switchMap(action =>
        // Simulate network call
        observableOf(
          fromTodos.loadSuccessAction({
            todos: [
              {
                id: 0.123456789,
                text: 'Remove before flight!',
                creationDate: new Date(2018, 1, 6),
                completed: false,
              },
            ],
          }),
        ).pipe(delay(1000)),
      ),
    ),
  );

  filter$ = createEffect(
    () =>
      this.actions$.pipe(
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
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private todosStore: Store<fromTodos.State>,
  ) {}
}
