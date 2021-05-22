import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  FooterComponent,
  NewTodoComponent,
  TodoListComponent,
} from '../../components';
import { TodoFilter } from '../../models';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, NewTodoComponent, FooterComponent, TodoListComponent],
  templateUrl: './todo.component.html',
  providers: [TodosStore],
})
export class TodoComponent implements OnInit {
  hasTodos$ = this.store.hasTodos$;
  hasCompletedTodos$ = this.store.hasCompletedTodos$;
  undoneTodosCount$ = this.store.undoneTodosCount$;
  currentFilter$ = this.store.filter$;
  filteredTodos$ = this.store.filteredTodos$;
  loading$ = this.store.loading$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: TodosStore,
  ) {}

  ngOnInit(): void {
    this.store.load();
    this.store.filter(
      this.route.params.pipe(
        map(params => {
          switch (params['filter']) {
            case 'active': {
              return 'SHOW_ACTIVE';
            }
            case 'completed': {
              return 'SHOW_COMPLETED';
            }
            default: {
              return 'SHOW_ALL';
            }
          }
        }),
      ),
    );
  }

  onAddTodo(text: string): void {
    this.store.add(text);
  }

  onToggle(id: number): void {
    this.store.toggle(id);
  }

  onUpdate(event: { id: number; text: string }): void {
    this.store.update(event);
  }

  onDelete(id: number): void {
    this.store.delete(id);
  }

  onFilter(filter: TodoFilter): void {
    switch (filter) {
      case 'SHOW_ACTIVE': {
        this.router.navigate(['/', 'active']);
        break;
      }
      case 'SHOW_COMPLETED': {
        this.router.navigate(['/', 'completed']);
        break;
      }
      default: {
        this.router.navigate(['/', 'all']);
        break;
      }
    }
  }

  onClearCompleted(): void {
    this.store.clearCompleted();
  }
}
