import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTodoComponent } from './new-todo.component';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should raise "addTodo" event', done => {
    fixture.detectChanges();

    component.addTodo.subscribe((text: string) => {
      // should trim text
      expect(text).toBe('Test component!');
      done();
    });
    const input: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('.new-todo');
    input.value = '  Test component!  ';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

    // should clear input field after raising event
    expect(
      fixture.debugElement.nativeElement.querySelector('.new-todo').value,
    ).toEqual('');
  });
});
