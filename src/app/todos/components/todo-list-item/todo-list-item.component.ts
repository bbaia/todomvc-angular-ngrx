import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './../../models';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [PushPipe],
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent {
  @Input() todo: Todo | undefined;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  // 'local state is fine'
  editing$ = new BehaviorSubject(false);

  updateText(todoId: number, text: string): void {
    if (text && text.trim() !== this.todo?.text) {
      this.update.emit({ id: todoId, text: text.trim() });
    }
    this.editing$.next(false);
  }

  activeEditMode(): void {
    this.editing$.next(true);
  }
}
