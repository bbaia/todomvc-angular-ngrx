import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {
  @Output() addTodo = new EventEmitter<string>();

  textField: FormControl;

  constructor() {
    this.textField = new FormControl('', [Validators.required]);
  }

  newTodo(): void {
    if (this.textField.valid) {
      const text = this.textField.value as string;
      this.addTodo.emit(text.trim());
      this.textField.setValue('', { emitEvent: false });
    }
  }
}
