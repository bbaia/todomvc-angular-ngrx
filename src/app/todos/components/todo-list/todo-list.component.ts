import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Todo } from '../../models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Output() toggle = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<string>();

  todosTrackByFn(index, item: Todo) {
    return item.id;
  }
}
