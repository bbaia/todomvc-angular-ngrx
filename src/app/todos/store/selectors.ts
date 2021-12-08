import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../../store';
import { TodoFilter } from '../models';
import * as todoEntity from './entities/todo';
import * as fromTodos from './reducers';

export const selectTodoState = createFeatureSelector<fromTodos.State>('todos');

// Raw selectors

const { selectIds, selectEntities, selectAll, selectTotal } =
  todoEntity.adapter.getSelectors();

export const selectAllTodos = createSelector(selectTodoState, state =>
  selectAll(state.data),
);

export const selectTotalTodos = createSelector(selectTodoState, state =>
  selectTotal(state.data),
);

export const selectLoading = createSelector(
  selectTodoState,
  state => state.loading,
);

// Calculated selectors

export const selectFilter = createSelector(
  fromApp.selectRouteParamFilter,
  (routeFilter): TodoFilter => {
    switch (routeFilter) {
      case 'active': {
        return 'SHOW_ACTIVE';
      }
      case 'completed': {
        return 'SHOW_COMPLETED';
      }
      default: {
        return 'SHOW_ALL';
      }
    }
  },
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
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

export const selectHasTodos = createSelector(selectTotalTodos, totalTodos => {
  return totalTodos > 0;
});

export const selectHasCompletedTodos = createSelector(selectAllTodos, todos => {
  return todos.filter(t => t.completed).length > 0;
});

export const selectUndoneTodosCount = createSelector(selectAllTodos, todos => {
  return todos.filter(t => !t.completed).length;
});
