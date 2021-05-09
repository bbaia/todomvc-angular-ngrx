import * as fromTodos from '.';
import { Todo } from '../models';

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
    expect(fromTodos.selectAllTodos.projector(state)).toMatchSnapshot();
    expect(fromTodos.selectTotalTodos.projector(state)).toEqual(3);
    expect(fromTodos.selectLoading.projector(state)).toEqual(false);
  });

  describe('Calculated selectors', () => {
    it('selectFilter', () => {
      // Assert
      expect(fromTodos.selectFilter.projector('all')).toEqual('SHOW_ALL');
      expect(fromTodos.selectFilter.projector('active')).toEqual('SHOW_ACTIVE');
      expect(fromTodos.selectFilter.projector('completed')).toEqual(
        'SHOW_COMPLETED',
      );
    });

    it('selectFilteredTodos', () => {
      // Assert
      expect(
        fromTodos.selectFilteredTodos.projector(todos, 'SHOW_ALL'),
      ).toMatchSnapshot('All todos');
      expect(
        fromTodos.selectFilteredTodos.projector(todos, 'SHOW_COMPLETED'),
      ).toMatchSnapshot('Completed todos');
      expect(
        fromTodos.selectFilteredTodos.projector(todos, 'SHOW_ACTIVE'),
      ).toMatchSnapshot('Active todos');
    });

    it('selectHasTodos', () => {
      // Assert
      expect(fromTodos.selectHasTodos.projector(5)).toEqual(true);
      expect(fromTodos.selectHasTodos.projector(0)).toEqual(false);
    });

    it('selectHasCompletedTodos', () => {
      // Assert
      expect(fromTodos.selectHasCompletedTodos.projector([])).toEqual(false);
      expect(fromTodos.selectHasCompletedTodos.projector(todos)).toEqual(true);
      expect(fromTodos.selectHasCompletedTodos.projector([todos[2]])).toEqual(
        false,
      );
    });

    it('selectUndoneTodosCount', () => {
      // Assert
      expect(fromTodos.selectUndoneTodosCount.projector([])).toEqual(0);
      expect(fromTodos.selectUndoneTodosCount.projector(todos)).toEqual(1);
      expect(
        fromTodos.selectUndoneTodosCount.projector([todos[0], todos[1]]),
      ).toEqual(0);
    });
  });
});
