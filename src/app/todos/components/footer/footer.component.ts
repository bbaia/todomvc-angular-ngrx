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
  @Input() hasCompletedTodos: boolean | undefined;
  @Input() undoneTodosCount: number | undefined;
  @Input() currentFilter: TodoFilter | undefined;
  @Output() filter = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter();
}
