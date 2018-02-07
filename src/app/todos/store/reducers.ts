import { Todo, TodoFilter } from '../models';
import * as fromTodos from './actions';

export interface State {
  todos: Todo[];
  filter: TodoFilter;
}

const initialState: State = {
  todos: [],
  filter: 'SHOW_ALL',
};

export function reducer(
  state: State = initialState,
  action: fromTodos.TodoActionType,
): State {
  switch (action.type) {
    case fromTodos.ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      };
    }

    case fromTodos.LOAD_TODOS_COMPLETED: {
      return {
        ...state,
        todos: action.todos,
      };
    }

    case fromTodos.TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.id === todo.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          } else {
            return todo;
          }
        }),
      };
    }

    case fromTodos.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => action.id !== todo.id),
      };
    }

    case fromTodos.UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.id === todo.id) {
            return {
              ...todo,
              text: action.text,
            };
          } else {
            return todo;
          }
        }),
      };
    }

    case fromTodos.CLEAR_COMPLETED_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
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
