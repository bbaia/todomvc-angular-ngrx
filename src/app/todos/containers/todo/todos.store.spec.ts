import { TestBed } from '@angular/core/testing';
import { skip, take, tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { Todo } from '../../models';
import { TodosService } from '../../services';
import { TodosStore } from './todos.store';

describe('TodosStore', () => {
  let todosService: TodosService;
  let todosStore: TodosStore;

  const testTodos: Todo[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosStore,
        {
          provide: TodosService,
          useValue: { getTodos: jest.fn() },
        },
      ],
    });

    todosService = TestBed.inject(TodosService);
    todosStore = TestBed.inject(TodosStore);
  });

  describe('Effects', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it('should load todos', done => {
      testScheduler.run(
        ({ cold, hot, expectObservable, expectSubscriptions, flush }) => {
          // Arrange
          todosService.getTodos = jest.fn(() => cold('--a|', { a: testTodos }));

          // Act
          todosStore.load();

          // Assert
          expectObservable(todosStore.totalTodos$).toBe('a-b', { a: 0, b: 3 });
          todosStore.state$
            .pipe(
              take(1),
              tap(state => expect(state).toMatchSnapshot()),
            )
            .subscribe();
          todosStore.state$
            .pipe(
              skip(1),
              tap(state => {
                expect(state).toMatchSnapshot();
                done();
              }),
            )
            .subscribe();
        },
      );
    });
  });

  describe('Updaters', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2020-01-01'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should add todos', done => {
      // Arrange
      jest.spyOn(Math, 'random').mockReturnValue(0.1);

      // Act
      todosStore.add('Learn Angular');
      jest.spyOn(Math, 'random').mockRestore();

      // Assert
      todosStore.state$.subscribe(state => {
        expect(state.todos.length).toEqual(1);
        expect(state).toMatchSnapshot();
        done();
      });
    });

    it('should mark todos as complete', done => {
      // Arrange
      todosStore.patchState({
        todos: [
          {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        ],
      });

      // Act
      todosStore.toggle(0.07);

      // Assert
      todosStore.state$.subscribe(state => {
        expect(state).toMatchSnapshot();
        done();
      });
    });

    it('should delete todos', done => {
      // Arrange
      todosStore.patchState({
        todos: [
          {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        ],
      });

      // Act
      todosStore.delete(0.07);

      // Assert
      todosStore.state$.subscribe(state => {
        expect(state).toMatchSnapshot();
        done();
      });
    });

    it('should update todos', done => {
      // Arrange
      todosStore.patchState({
        todos: [
          {
            id: 0.07,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        ],
      });

      // Act
      todosStore.update({
        id: 0.07,
        text: 'Learn Angular',
      });

      // Assert
      todosStore.state$.subscribe(state => {
        expect(state).toMatchSnapshot();
        done();
      });
    });

    it('should clear completed todos', done => {
      // Arrange
      todosStore.patchState({
        todos: [
          {
            id: 0.01,
            text: 'Learn Angular',
            creationDate: new Date(),
            completed: true,
          },
          {
            id: 0.02,
            text: 'Learn NgRx',
            creationDate: new Date(),
            completed: true,
          },
          {
            id: 0.03,
            text: 'Learn Jest',
            creationDate: new Date(),
            completed: false,
          },
        ],
      });

      // Act
      todosStore.clearCompleted();

      // Assert
      todosStore.state$.subscribe(state => {
        expect(state).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Selectors', () => {
    it('filteredTodos$ should return all todos', done => {
      todosStore.patchState({
        todos: testTodos,
        filter: 'SHOW_ALL',
      });
      todosStore.filteredTodos$.subscribe(todos => {
        expect(todos.length).toEqual(3);
        expect(todos).toMatchSnapshot('All todos');
        done();
      });
    });

    it('filteredTodos$ should return completed todos', done => {
      todosStore.patchState({
        todos: testTodos,
        filter: 'SHOW_COMPLETED',
      });
      todosStore.filteredTodos$.subscribe(todos => {
        expect(todos.length).toEqual(2);
        expect(todos).toMatchSnapshot('Completed todos');
        done();
      });
    });

    it('filteredTodos$ should return active todos', done => {
      todosStore.patchState({
        todos: testTodos,
        filter: 'SHOW_ACTIVE',
      });
      todosStore.filteredTodos$.subscribe(todos => {
        expect(todos.length).toEqual(1);
        expect(todos).toMatchSnapshot('Active todos');
        done();
      });
    });

    it('hasTodos$ should return true with todos', done => {
      todosStore.patchState({
        todos: testTodos,
        filter: 'SHOW_ACTIVE',
      });
      todosStore.hasTodos$.subscribe(result => {
        expect(result).toEqual(true);
        done();
      });
    });

    it('hasTodos$ should return false with no todos', done => {
      todosStore.hasTodos$.subscribe(result => {
        expect(result).toEqual(false);
        done();
      });
    });

    it('hasCompletedTodos$ should return true with completed todos', done => {
      todosStore.patchState({
        todos: testTodos,
      });
      todosStore.hasCompletedTodos$.subscribe(result => {
        expect(result).toEqual(true);
        done();
      });
    });

    it('hasCompletedTodos$ should return false with only undone todos', done => {
      todosStore.patchState({
        todos: [testTodos[2]],
      });
      todosStore.hasCompletedTodos$.subscribe(result => {
        expect(result).toEqual(false);
        done();
      });
    });

    it('undoneTodosCount$ should return undone todos count', done => {
      todosStore.patchState({
        todos: testTodos,
      });
      todosStore.undoneTodosCount$.subscribe(count => {
        expect(count).toEqual(1);
        done();
      });
    });
  });
});
