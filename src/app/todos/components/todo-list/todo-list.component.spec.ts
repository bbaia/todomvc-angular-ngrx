import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render', () => {
    component.todos = [
      {
        id: 0.1,
        text: 'Learn Angular',
        creationDate: new Date(),
        completed: true,
      },
      {
        id: 0.2,
        text: 'Learn NgRx',
        creationDate: new Date(),
        completed: true,
      },
      {
        id: 0.3,
        text: 'Learn Jest',
        creationDate: new Date(),
        completed: true,
      },
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
