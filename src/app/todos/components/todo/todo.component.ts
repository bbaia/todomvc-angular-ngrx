import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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

  constructor(private store: Store<fromTodos.State>) {
    this.hasTodos$ = this.store.select(fromTodos.getHasTodos);
    this.undoneTodosCount$ = this.store.select(fromTodos.getUndoneTodosCount);
    this.currentFilter$ = this.store.select(fromTodos.getFilter);
    this.filteredTodos$ = this.store.select(fromTodos.getFilteredTodos);
  }

  ngOnInit() {
    this.store.dispatch(new fromTodos.LoadAction());
  }

  onAddTodo(text: string) {
    this.store.dispatch(new fromTodos.AddAction(text));
  }

  onToggle(id: number) {
    this.store.dispatch(new fromTodos.ToggleAction(id));
  }

  onUpdate(event: { id: number; text: string }) {
    this.store.dispatch(new fromTodos.UpdateAction(event.id, event.text));
  }

  onDelete(id: number) {
    this.store.dispatch(new fromTodos.DeleteAction(id));
  }

  onFilter(filter: TodoFilter) {
    this.store.dispatch(new fromTodos.SetFilterAction(filter));
  }

  onClearCompleted() {
    this.store.dispatch(new fromTodos.ClearCompletedAction());
  }
}
