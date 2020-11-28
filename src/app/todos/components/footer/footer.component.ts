import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoFilter } from '../../models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() hasCompletedTodos: boolean;
  @Input() undoneTodosCount: number;
  @Input() currentFilter: TodoFilter;
  @Output() filter = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter();
}
