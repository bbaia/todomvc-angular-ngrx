import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from './../../models';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent implements OnChanges {
  @Input() todo: Todo | null = null;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  textField: FormControl;
  checkField: FormControl;

  // 'local state is fine'
  editing = false;

  constructor() {
    this.textField = new FormControl('', [Validators.required]);
    this.checkField = new FormControl(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todo && this.todo) {
      this.textField.setValue(this.todo.text);
      this.checkField.setValue(this.todo.completed, { emitEvent: false });
    }
  }

  updateText(todoId: number): void {
    if (this.textField.valid && this.editing) {
      const text = this.textField.value as string;
      this.update.emit({ id: todoId, text: text.trim() });
      this.editing = false;
    }
  }

  activeEditMode(): void {
    this.editing = true;
  }
}
