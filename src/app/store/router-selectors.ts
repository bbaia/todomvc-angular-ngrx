import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './reducers';
import { CustomRouterState } from './router-state-serializer';

export const selectRouter = createFeatureSelector<
  fromApp.State,
  fromRouter.RouterReducerState<CustomRouterState>
>('router');

export const selectRouteParamFilter = createSelector(
  selectRouter,
  router => router.state.params.filter,
);
