import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CustomRouterState } from './router-state-serializer';

export const getRouter = createFeatureSelector<
  fromRouter.RouterReducerState<CustomRouterState>
>('router');

export const getRouteParamFilter = createSelector(
  getRouter,
  router => router.state.params.filter,
);
