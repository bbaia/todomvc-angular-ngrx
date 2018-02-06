import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from './../../models';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<string>();

  textField: FormControl;
  checkField: FormControl;

  // 'local state is fine'
  editing: boolean;

  constructor() {
    this.textField = new FormControl('', [Validators.required]);
    this.checkField = new FormControl(false);
  }

  ngOnInit() {
    this.textField.setValue(this.todo.text);
    this.checkField.setValue(this.todo.completed, { emitEvent: false });
  }

  updateText() {
    if (this.textField.valid && this.editing) {
      const text = this.textField.value as string;
      this.update.emit({ id: this.todo.id, text: text.trim() });
      this.editing = false;
    }
  }

  activeEditMode() {
    this.editing = true;
  }
}
