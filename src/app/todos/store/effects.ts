import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Todo } from '../models';
import * as fromTodos from '../store';

@Injectable()
export class TodosEffects {
  @Effect()
  loadTodos$: Observable<Action> = this.actions$
    .ofType(fromTodos.LOAD_TODOS)
    .switchMap(action =>
      // Simulate network call
      Observable.of(
        new fromTodos.LoadCompletedAction([
          {
            id: 0.123456789,
            text: 'Remove before flight!',
            creationDate: new Date(2018, 1, 6),
            completed: false,
          },
        ]),
      ).delay(1000),
    );

  constructor(
    private actions$: Actions,
    private todosStore: Store<fromTodos.State>,
  ) {}
}
