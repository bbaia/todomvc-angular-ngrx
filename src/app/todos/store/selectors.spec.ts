import { Todo } from '../models';

import * as fromTodos from '.';

describe('todos selectors', () => {
  const todos: Todo[] = [
    {
      id: 0.1,
      text: 'Learn Angular',
      creationDate: new Date('2020-01-01'),
      completed: true,
    },
    {
      id: 0.2,
      text: 'Learn NgRx',
      creationDate: new Date('2020-02-01'),
      completed: true,
    },
    {
      id: 0.3,
      text: 'Learn Jest',
      creationDate: new Date('2020-03-01'),
      completed: false,
    },
  ];

  it('Raw selectors', () => {
    // Arrange
    const loadSuccessAction = fromTodos.loadSuccessAction({ todos });

    // Act
    const state = fromTodos.reducer(fromTodos.initialState, loadSuccessAction);

    // Assert
    expect(fromTodos.getAllTodos.projector(state)).toMatchSnapshot();
    expect(fromTodos.getTotalTodos.projector(state)).toEqual(3);
    expect(fromTodos.getLoading.projector(state)).toEqual(false);
  });

  describe('Calculated selectors', () => {
    it('getFilter', () => {
      // Assert
      expect(fromTodos.getFilter.projector('all')).toEqual('SHOW_ALL');
      expect(fromTodos.getFilter.projector('active')).toEqual('SHOW_ACTIVE');
      expect(fromTodos.getFilter.projector('completed')).toEqual(
        'SHOW_COMPLETED',
      );
    });

    it('getFilteredTodos', () => {
      // Assert
      expect(
        fromTodos.getFilteredTodos.projector(todos, 'SHOW_ALL'),
      ).toMatchSnapshot('All todos');
      expect(
        fromTodos.getFilteredTodos.projector(todos, 'SHOW_COMPLETED'),
      ).toMatchSnapshot('Completed todos');
      expect(
        fromTodos.getFilteredTodos.projector(todos, 'SHOW_ACTIVE'),
      ).toMatchSnapshot('Active todos');
    });

    it('getHasTodos', () => {
      // Assert
      expect(fromTodos.getHasTodos.projector(5)).toEqual(true);
      expect(fromTodos.getHasTodos.projector(0)).toEqual(false);
    });

    it('hasCompletedTodos', () => {
      // Assert
      expect(fromTodos.hasCompletedTodos.projector([])).toEqual(false);
      expect(fromTodos.hasCompletedTodos.projector(todos)).toEqual(true);
      expect(fromTodos.hasCompletedTodos.projector([todos[2]])).toEqual(false);
    });

    it('getUndoneTodosCount', () => {
      // Assert
      expect(fromTodos.getUndoneTodosCount.projector([])).toEqual(0);
      expect(fromTodos.getUndoneTodosCount.projector(todos)).toEqual(1);
      expect(
        fromTodos.getUndoneTodosCount.projector([todos[0], todos[1]]),
      ).toEqual(0);
    });
  });
});
