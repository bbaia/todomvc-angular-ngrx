import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  templateUrl: './new-todo.component.html',
})
export class NewTodoComponent {
  @Output() addTodo = new EventEmitter<string>();

  newTodo(text: string): void {
    if (text && text.trim()) {
      this.addTodo.emit(text.trim());
    }
  }
}
