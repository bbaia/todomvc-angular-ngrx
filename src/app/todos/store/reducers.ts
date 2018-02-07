import { Todo, TodoFilter } from '../models';
import * as fromTodos from './actions';
import * as todoEntity from './entities/todo';

export interface State {
  todos: todoEntity.State;
  filter: TodoFilter;
  loading: boolean;
}

const initialState: State = {
  todos: todoEntity.initialState,
  filter: 'SHOW_ALL',
  loading: false,
};

export function reducer(
  state: State = initialState,
  action: fromTodos.TodoActionType,
): State {
  switch (action.type) {
    case fromTodos.ADD_TODO: {
      return {
        ...state,
        todos: todoEntity.adapter.addOne(
          {
            id: action.id,
            text: action.text,
            creationDate: new Date(),
            completed: false,
          },
          state.todos,
        ),
      };
    }

    case fromTodos.LOAD_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromTodos.LOAD_TODOS_COMPLETED: {
      return {
        ...state,
        todos: todoEntity.adapter.addAll(action.todos, state.todos),
        loading: false,
      };
    }

    case fromTodos.TOGGLE_TODO: {
      return {
        ...state,
        todos: todoEntity.adapter.updateOne(
          {
            id: action.id,
            changes: { completed: !state.todos.entities[action.id].completed },
          },
          state.todos,
        ),
      };
    }

    case fromTodos.DELETE_TODO: {
      return {
        ...state,
        todos: todoEntity.adapter.removeOne(action.id, state.todos),
      };
    }

    case fromTodos.UPDATE_TODO: {
      return {
        ...state,
        todos: todoEntity.adapter.updateOne(
          { id: action.id, changes: { text: action.text } },
          state.todos,
        ),
      };
    }

    case fromTodos.CLEAR_COMPLETED_TODO: {
      return {
        ...state,
        todos: todoEntity.adapter.removeMany(
          state.todos.ids.filter(id => state.todos.entities[id].completed),
          state.todos,
        ),
      };
    }

    case fromTodos.SET_TODO_FILTER: {
      return {
        ...state,
        filter: action.filter,
      };
    }

    default: {
      return state;
    }
  }
}
