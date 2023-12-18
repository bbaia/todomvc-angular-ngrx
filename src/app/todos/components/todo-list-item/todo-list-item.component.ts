import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './../../models';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent {
  @Input() todo: Todo | null = null;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  // 'local state is fine'
  editing = false;

  updateText(todoId: number, text: string): void {
    if (text && text.trim() !== this.todo?.text) {
      this.update.emit({ id: todoId, text: text.trim() });
    }
    this.editing = false;
  }

  activeEditMode(): void {
    this.editing = true;
  }
}
