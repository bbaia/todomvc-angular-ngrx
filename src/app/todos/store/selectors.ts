import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromTodos from './reducers';
import { Todo } from '../models';

export const getTodoState = createFeatureSelector<fromTodos.State>('todos');

// Raw selectors

export const getFilter = createSelector(getTodoState, state => state.filter);

export const getTodos = createSelector(getTodoState, state => state.todos);

export const getLoading = createSelector(getTodoState, state => state.loading);

// Calculated selectors

export const getFilteredTodos = createSelector(
  getTodos,
  getFilter,
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

export const getHasTodos = createSelector(getTodos, todos => {
  return todos.length > 0;
});

export const getUndoneTodosCount = createSelector(getTodos, todos => {
  return todos.filter(t => !t.completed).length;
});
