import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

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

export const getAppState = (state: State) => state;

export const getRouter = createFeatureSelector<
  fromRouter.RouterReducerState<CustomRouterState>
>('router');

export const getRouterState = createSelector(getRouter, router => router.state);
