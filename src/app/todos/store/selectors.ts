import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromTodos from './reducers';
import * as todoEntity from './entities/todo';
import { Todo } from '../models';

export const getTodoState = createFeatureSelector<fromTodos.State>('todos');

// Raw selectors

export const getFilter = createSelector(getTodoState, state => state.filter);

export const {
  selectIds: getTodoIds,
  selectEntities: getTodoEntities,
  selectAll: getAllTodos,
  selectTotal: getTotalTodos,
} = todoEntity.adapter.getSelectors(
  createSelector(getTodoState, state => state.todos),
);
export const getTodos = createSelector(getTodoState, state => state.todos);

export const getLoading = createSelector(getTodoState, state => state.loading);

// Calculated selectors

export const getFilteredTodos = createSelector(
  getAllTodos,
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

export const getHasTodos = createSelector(getTotalTodos, totalTodos => {
  return totalTodos > 0;
});

export const getUndoneTodosCount = createSelector(getAllTodos, todos => {
  return todos.filter(t => !t.completed).length;
});
