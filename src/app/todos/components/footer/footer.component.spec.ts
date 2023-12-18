import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoFilter } from '../../models';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render', () => {
    component.hasCompletedTodos = true;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ALL';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should raise "filter" event', done => {
    component.hasCompletedTodos = false;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ALL';
    fixture.detectChanges();

    component.filter.subscribe((filter: TodoFilter) => {
      expect(filter).toBe('SHOW_ACTIVE');
      done();
    });
    fixture.debugElement.nativeElement
      .querySelector('.filters > li:nth-of-type(2) > a')
      .click();
  });

  it('should raise "clearCompleted" event', done => {
    component.hasCompletedTodos = true;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ALL';
    fixture.detectChanges();

    component.clearCompleted.subscribe(() => {
      done();
    });
    fixture.debugElement.nativeElement
      .querySelector('.clear-completed')
      .click();
  });

  it('should hide "Clear completed" button with nothing completed', () => {
    component.hasCompletedTodos = false;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ALL';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.clear-completed'),
    ).toBeNull();
  });

  it('should display undone todos', () => {
    component.hasCompletedTodos = false;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ALL';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.todo-count')
        .textContent,
    ).toEqual(`${component.undoneTodosCount} items left`);
  });

  it('should select current filter', () => {
    component.hasCompletedTodos = false;
    component.undoneTodosCount = 1;
    component.currentFilter = 'SHOW_ACTIVE';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement
        .querySelector('.filters > li > a.selected')
        .textContent.trim(),
    ).toEqual(`Active`);
  });
});
