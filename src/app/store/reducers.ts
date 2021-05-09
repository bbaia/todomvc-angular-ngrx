import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import * as fromTodos from '../todos/store/reducers';
import { CustomRouterState } from './router-state-serializer';

export interface State {
  todos: fromTodos.State;
  router: fromRouter.RouterReducerState<CustomRouterState>;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodos.reducer,
  router: fromRouter.routerReducer,
};
