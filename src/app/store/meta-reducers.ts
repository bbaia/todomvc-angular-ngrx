import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './reducers';

// console.log actions and state
export function logger(
  reducer: ActionReducer<fromApp.State>,
): ActionReducer<fromApp.State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<fromApp.State>[] = environment.production
  ? []
  : [logger];
