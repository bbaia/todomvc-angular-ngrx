import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo, TodoFilter } from '../../models';
import * as fromTodos from '../../store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  hasTodos$: Observable<boolean>;
  undoneTodosCount$: Observable<number>;
  currentFilter$: Observable<TodoFilter>;
  filteredTodos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromTodos.State>) {
    this.hasTodos$ = this.store.select(fromTodos.getHasTodos);
    this.undoneTodosCount$ = this.store.select(fromTodos.getUndoneTodosCount);
    this.currentFilter$ = this.store.select(fromTodos.getFilter);
    this.filteredTodos$ = this.store.select(fromTodos.getFilteredTodos);
    this.loading$ = this.store.select(fromTodos.getLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(new fromTodos.LoadAction());
  }

  onAddTodo(text: string): void {
    this.store.dispatch(new fromTodos.AddAction(text));
  }

  onToggle(id: number): void {
    this.store.dispatch(new fromTodos.ToggleAction(id));
  }

  onUpdate(event: { id: number; text: string }): void {
    this.store.dispatch(new fromTodos.UpdateAction(event.id, event.text));
  }

  onDelete(id: number): void {
    this.store.dispatch(new fromTodos.DeleteAction(id));
  }

  onFilter(filter: TodoFilter): void {
    this.store.dispatch(new fromTodos.SetFilterAction(filter));
  }

  onClearCompleted(): void {
    this.store.dispatch(new fromTodos.ClearCompletedAction());
  }
}
