import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoFilter } from '../../models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() hasCompletedTodos: boolean | null = null;
  @Input() undoneTodosCount: number | null = null;
  @Input() currentFilter: TodoFilter | null = null;
  @Output() filter = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter();
}
