import { createAction, props } from '@ngrx/store';
import { Todo, TodoFilter } from '../models';

export const addAction = createAction('[TODO] add', (text: string) => ({
  id: Math.random(),
  text,
}));

export const loadAction = createAction('[TODO] load');

export const loadSuccessAction = createAction(
  '[TODO] load success',
  props<{ todos: Todo[] }>(),
);

export const deleteAction = createAction(
  '[TODO] delete',
  props<{ id: number }>(),
);

export const toggleAction = createAction(
  '[TODO] toggle',
  props<{ id: number }>(),
);

export const updateAction = createAction(
  '[TODO] update',
  props<{ id: number; text: string }>(),
);

export const clearCompletedAction = createAction('[TODO] clear completed');

export const setFilterAction = createAction(
  '[TODO] Set filter',
  props<{ filter: TodoFilter }>(),
);
