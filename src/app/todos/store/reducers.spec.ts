import * as fromTodos from '.';

describe('todos reducers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2020-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should load todos', () => {
    // Arrange
    const loadAction = fromTodos.loadAction();
    const loadSuccessAction = fromTodos.loadSuccessAction({
      todos: [
        {
          id: 0.234567891,
          text: 'Learn Angular',
          creationDate: new Date('2020-02-01'),
          completed: true,
        },
        {
          id: 0.345678912,
          text: 'Learn Jest',
          creationDate: new Date('2020-03-01'),
          completed: false,
        },
      ],
    });

    // Act
    const state1 = fromTodos.reducer(fromTodos.initialState, loadAction);
    const state2 = fromTodos.reducer(state1, loadSuccessAction);

    // Assert
    expect(state1).toMatchSnapshot();
    expect(state2).toMatchSnapshot();
  });

  it('should add todos', () => {
    // Arrange
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    const firstAddAction = fromTodos.addAction('Learn Angular');
    jest.spyOn(Math, 'random').mockReturnValue(0.2);
    const secondAddAction = fromTodos.addAction('Learn NgRx');
    jest.spyOn(Math, 'random').mockRestore();

    // Act
    const state1 = fromTodos.reducer(fromTodos.initialState, firstAddAction);
    const state2 = fromTodos.reducer(state1, secondAddAction);

    // Assert
    expect(state2).toMatchSnapshot();
  });

  it('should mark todos as complete', () => {
    // Arrange
    const initialState: fromTodos.State = {
      data: {
        entities: {
          0.07: {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        },
        ids: [0.07],
      },
      loading: false,
    };
    const toggleAction = fromTodos.toggleAction({ id: 0.07 });

    // Act
    const state = fromTodos.reducer(initialState, toggleAction);

    // Assert
    expect(state).toMatchSnapshot();
  });

  it('should delete todos', () => {
    // Arrange
    const initialState: fromTodos.State = {
      data: {
        entities: {
          0.07: {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        },
        ids: [0.07],
      },
      loading: false,
    };
    const deleteAction = fromTodos.deleteAction({ id: 0.07 });

    // Act
    const state = fromTodos.reducer(initialState, deleteAction);

    // Assert
    expect(state).toMatchSnapshot();
  });

  it('should update todos', () => {
    // Arrange
    const initialState: fromTodos.State = {
      data: {
        entities: {
          0.07: {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        },
        ids: [0.07],
      },
      loading: false,
    };
    const updateAction = fromTodos.updateAction({
      id: 0.07,
      text: 'Learn Angular',
    });

    // Act
    const state = fromTodos.reducer(initialState, updateAction);

    // Assert
    expect(state).toMatchSnapshot();
  });

  it('should clear completed todos', () => {
    // Arrange
    const initialState: fromTodos.State = {
      data: {
        entities: {
          0.01: {
            id: 0.01,
            text: 'Learn Angular',
            creationDate: new Date(),
            completed: true,
          },
          0.02: {
            id: 0.02,
            text: 'Learn NgRx',
            creationDate: new Date(),
            completed: true,
          },
          0.03: {
            id: 0.03,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        },
        ids: [0.01, 0.02, 0.03],
      },
      loading: false,
    };
    const clearCompletedAction = fromTodos.clearCompletedAction();

    // Act
    const state = fromTodos.reducer(initialState, clearCompletedAction);

    // Assert
    expect(state).toMatchSnapshot();
  });
});
