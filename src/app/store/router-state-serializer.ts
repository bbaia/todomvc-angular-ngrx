import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store.
 */

export interface CustomRouterState {
  url: string;
  path: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<CustomRouterState> {
  serialize(routerState: RouterStateSnapshot): CustomRouterState {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;
    const path = route.url.length
      ? route.url[0].path
      : route.parent && route.parent.url.length ? route.parent.url[0].path : '';
    const queryParams = routerState.root.queryParams;
    const params = route.params;

    return { url, path, params, queryParams };
  }
}
