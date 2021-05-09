import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '../../models';

export interface State extends EntityState<Todo> {
  ids: number[];
  // additional entity state properties
}

function sortByCreationDate(a: Todo, b: Todo): number {
  return b.creationDate.getTime() - a.creationDate.getTime();
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  // sortComparer: sortByCreationDate,
});

export const initialState: State = adapter.getInitialState({
  ids: [],
  // additional entity state properties
});
