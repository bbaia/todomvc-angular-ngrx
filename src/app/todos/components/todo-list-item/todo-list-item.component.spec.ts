import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListItemComponent } from './todo-list-item.component';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render', () => {
    component.todo = {
      id: 0.1,
      text: 'Learn TDD',
      creationDate: new Date(),
      completed: true,
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should raise "toggle" event', done => {
    component.todo = {
      id: 0.1,
      text: 'Learn TDD',
      creationDate: new Date(),
      completed: false,
    };
    fixture.detectChanges();

    component.toggle.subscribe((id: number) => {
      // should trim text
      expect(id).toBe(0.1);
      done();
    });
    fixture.debugElement.nativeElement.querySelector('.toggle').click();
  });

  it('should raise "update" event', done => {
    component.todo = {
      id: 0.1,
      text: 'Learn TDD',
      creationDate: new Date(),
      completed: false,
    };
    fixture.detectChanges();

    component.update.subscribe(({ id, text }) => {
      // should trim text
      expect(id).toBe(0.1);
      expect(text).toEqual('Learn Jest');
      done();
    });
    fixture.debugElement.nativeElement
      .querySelector('.view > label')
      .dispatchEvent(
        new MouseEvent('dblclick', {
          bubbles: true,
          view: window,
        }),
      );
    const input: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('.edit');
    input.value = 'Learn Jest ';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
  });

  it('should raise "delete" event', done => {
    component.todo = {
      id: 0.1,
      text: 'Learn TDD',
      creationDate: new Date(),
      completed: false,
    };
    fixture.detectChanges();

    component.delete.subscribe((id: number) => {
      // should trim text
      expect(id).toBe(0.1);
      done();
    });
    fixture.debugElement.nativeElement.querySelector('.destroy').click();
  });
});
