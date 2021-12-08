import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from './router-state-serializer';

export const selectRouter =
  createFeatureSelector<fromRouter.RouterReducerState<CustomRouterState>>(
    'router',
  );

export const selectRouteParamFilter = createSelector(
  selectRouter,
  router => router.state.params['filter'],
);
