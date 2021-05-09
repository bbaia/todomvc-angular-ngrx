import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import * as fromTodos from '.';
import { Todo } from '../models';
import { TodosService } from '../services';
import { TodosEffects } from './effects';

describe('TodosEffects', () => {
  let testScheduler: TestScheduler;
  let effects: TodosEffects;
  let router: Router;
  let todosService: TodosService;
  let actions$: Observable<Action>;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        {
          provide: TodosService,
          useValue: { getTodos: jest.fn() },
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(TodosEffects);
    todosService = TestBed.inject(TodosService);
    router = TestBed.inject(Router);
    actions$ = TestBed.inject(Actions);
  });

  describe('loadTodos$', () => {
    it('should return a loadSuccessAction, with the todos', () => {
      const todo1: Todo = {
        id: 0.234567891,
        text: 'Learn NgRx',
        creationDate: new Date('2020-02-01'),
        completed: true,
      };
      const todo2: Todo = {
        id: 0.345678912,
        text: 'Learn Jest',
        creationDate: new Date('2020-03-01'),
        completed: false,
      };
      const loadAction = fromTodos.loadAction();
      const loadSuccessAction = fromTodos.loadSuccessAction({
        todos: [todo1, todo2],
      });

      testScheduler.run(
        ({ cold, hot, expectObservable, expectSubscriptions, flush }) => {
          actions$ = hot('-a', { a: loadAction });

          const response = cold('-b|', { b: [todo1, todo2] });
          todosService.getTodos = jest.fn(() => response);

          expectObservable(effects.loadTodos$).toBe('--c', {
            c: loadSuccessAction,
          });
        },
      );
    });
  });

  describe('filter$', () => {
    it('should navigate to new route', () => {
      actions$ = of(
        fromTodos.setFilterAction({
          filter: 'SHOW_ACTIVE',
        }),
      );

      // dispatch: false
      effects.filter$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/', 'active']);
    });
  });
});
