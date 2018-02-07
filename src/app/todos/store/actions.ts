import { Action } from '@ngrx/store';

import { Todo, TodoFilter } from '../models';

export const ADD_TODO = '[TODO] add';
export const DELETE_TODO = '[TODO] delete';
export const TOGGLE_TODO = '[TODO] toggle';
export const UPDATE_TODO = '[TODO] update';
export const LOAD_TODOS = '[TODO] load';
export const LOAD_TODOS_COMPLETED = '[TODO] load completed';
export const CLEAR_COMPLETED_TODO = '[TODO] clear completed';
export const SET_TODO_FILTER = '[TODO] Set filter';

export class AddAction implements Action {
  readonly type = ADD_TODO;
  public id: number;

  constructor(public text: string) {
    this.id = Math.random();
  }
}

export class LoadAction implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadCompletedAction implements Action {
  readonly type = LOAD_TODOS_COMPLETED;

  constructor(public todos: Todo[]) {}
}

export class DeleteAction implements Action {
  readonly type = DELETE_TODO;

  constructor(public id: number) {}
}

export class ToggleAction implements Action {
  readonly type = TOGGLE_TODO;

  constructor(public id: number) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE_TODO;

  constructor(public id: number, public text: string) {}
}

export class ClearCompletedAction implements Action {
  readonly type = CLEAR_COMPLETED_TODO;
}

export class SetFilterAction implements Action {
  readonly type = SET_TODO_FILTER;

  constructor(public filter: TodoFilter) {}
}

export type TodoActionType =
  | AddAction
  | LoadAction
  | LoadCompletedAction
  | ToggleAction
  | DeleteAction
  | UpdateAction
  | ClearCompletedAction
  | SetFilterAction;
