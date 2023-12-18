import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoFilter } from '../../models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() hasCompletedTodos: boolean | null = null;
  @Input() undoneTodosCount: number | null = null;
  @Input() currentFilter: TodoFilter | null = null;
  @Output() filter = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter();
}
