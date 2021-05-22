import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Todo, TodoFilter } from '../../models';
import { TodosService } from '../../services';

export interface TodosState {
  todos: Todo[];
  filter: TodoFilter;
  loading: boolean;
}

export const initialState: TodosState = {
  todos: [],
  filter: 'SHOW_ALL',
  loading: false,
};

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private todosService: TodosService) {
    super(initialState);
  }

  // Effects

  readonly load = this.effect((_: Observable<void> = of()) => {
    return _.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.todosService.getTodos().pipe(
          // delay(1000), // Simulate network latency for loading animation
          tapResponse(
            todos => {
              this.patchState({ todos, loading: false });
            },
            error => {
              this.patchState({ loading: false });
              console.log(error);
            },
          ),
        ),
      ),
    );
  });

  // Write

  readonly add = this.updater(
    (state, text: string): TodosState => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: Math.random(),
          text,
          creationDate: new Date(),
          completed: false,
        },
      ],
    }),
  );

  readonly toggle = this.updater(
    (state, id: number): TodosState => ({
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }),
  );

  readonly delete = this.updater(
    (state, id: number): TodosState => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
    }),
  );

  readonly update = this.updater(
    (state, value: { id: number; text: string }): TodosState => ({
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== value.id) {
          return todo;
        }
        return {
          ...todo,
          text: value.text,
        };
      }),
    }),
  );

  readonly clearCompleted = this.updater(
    (state): TodosState => ({
      ...state,
      todos: state.todos.filter(todo => !todo.completed),
    }),
  );

  readonly filter = this.updater(
    (state, filter: TodoFilter): TodosState => ({
      ...state,
      filter,
    }),
  );

  // Read

  readonly todos$ = this.select(state => state.todos);

  readonly filter$ = this.select(state => state.filter);

  readonly loading$ = this.select(state => state.loading);

  readonly totalTodos$ = this.select(this.todos$, todos => todos.length);

  readonly filteredTodos$ = this.select(
    this.todos$,
    this.filter$,
    (todos, filter) => {
      switch (filter) {
        default:
        case 'SHOW_ALL':
          return todos;
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed);
      }
    },
  );

  readonly hasTodos$ = this.select(
    this.totalTodos$,
    totalTodos => totalTodos > 0,
  );

  readonly hasCompletedTodos$ = this.select(
    this.todos$,
    todos => todos.filter(t => t.completed).length > 0,
  );

  readonly undoneTodosCount$ = this.select(
    this.todos$,
    todos => todos.filter(t => !t.completed).length,
  );
}
