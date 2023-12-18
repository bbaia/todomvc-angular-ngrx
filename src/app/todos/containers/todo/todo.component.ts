import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FooterComponent,
  NewTodoComponent,
  TodoListComponent,
} from '../../components';
import { TodoFilter } from '../../models';
import * as fromTodos from '../../store';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, NewTodoComponent, FooterComponent, TodoListComponent],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  hasTodos$ = this.store.select(fromTodos.selectHasTodos);
  hasCompletedTodos$ = this.store.select(fromTodos.selectHasCompletedTodos);
  undoneTodosCount$ = this.store.select(fromTodos.selectUndoneTodosCount);
  currentFilter$ = this.store.select(fromTodos.selectFilter);
  filteredTodos$ = this.store.select(fromTodos.selectFilteredTodos);
  loading$ = this.store.select(fromTodos.selectLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fromTodos.loadAction());
  }

  onAddTodo(text: string): void {
    this.store.dispatch(fromTodos.addAction(text));
  }

  onToggle(id: number): void {
    this.store.dispatch(fromTodos.toggleAction({ id }));
  }

  onUpdate(event: { id: number; text: string }): void {
    this.store.dispatch(fromTodos.updateAction(event));
  }

  onDelete(id: number): void {
    this.store.dispatch(fromTodos.deleteAction({ id }));
  }

  onFilter(filter: TodoFilter): void {
    this.store.dispatch(fromTodos.setFilterAction({ filter }));
  }

  onClearCompleted(): void {
    this.store.dispatch(fromTodos.clearCompletedAction());
  }
}
