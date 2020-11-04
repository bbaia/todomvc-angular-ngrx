import * as fromTodos from './actions';
import * as todoEntity from './entities/todo';

export interface State {
  data: todoEntity.State;
  loading: boolean;
}

const initialState: State = {
  data: todoEntity.initialState,
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
        data: todoEntity.adapter.addOne(
          {
            id: action.id,
            text: action.text,
            creationDate: new Date(),
            completed: false,
          },
          state.data,
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
        data: todoEntity.adapter.setAll(action.todos, state.data),
        loading: false,
      };
    }

    case fromTodos.TOGGLE_TODO: {
      return {
        ...state,
        data: todoEntity.adapter.updateOne(
          {
            id: action.id,
            changes: {
              completed: !state.data.entities[action.id].completed,
            },
          },
          state.data,
        ),
      };
    }

    case fromTodos.DELETE_TODO: {
      return {
        ...state,
        data: todoEntity.adapter.removeOne(action.id, state.data),
      };
    }

    case fromTodos.UPDATE_TODO: {
      return {
        ...state,
        data: todoEntity.adapter.updateOne(
          { id: action.id, changes: { text: action.text } },
          state.data,
        ),
      };
    }

    case fromTodos.CLEAR_COMPLETED_TODO: {
      return {
        ...state,
        data: todoEntity.adapter.removeMany(
          state.data.ids.filter(id => state.data.entities[id].completed),
          state.data,
        ),
      };
    }

    default: {
      return state;
    }
  }
}
