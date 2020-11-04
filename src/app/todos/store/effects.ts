import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import * as fromTodos from '../store';

@Injectable()
export class TodosEffects {
  @Effect()
  loadTodos$: Observable<Action> = this.actions$.pipe(
    ofType(fromTodos.LOAD_TODOS),
    switchMap(action =>
      // Simulate network call
      observableOf(
        new fromTodos.LoadCompletedAction([
          {
            id: 0.123456789,
            text: 'Remove before flight!',
            creationDate: new Date(2018, 1, 6),
            completed: false,
          },
        ]),
      ).pipe(delay(1000)),
    ),
  );

  @Effect({ dispatch: false })
  filter$: Observable<Action> = this.actions$.pipe(
    ofType(fromTodos.SET_TODO_FILTER),
    tap((action: fromTodos.SetFilterAction) => {
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

  constructor(
    private actions$: Actions,
    private router: Router,
    private todosStore: Store<fromTodos.State>,
  ) {}
}
