import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  template: `
    <div>
      <label>
        <input type="checkbox" [checked]="todo.completed" (change)="toggle.emit(todo)" >
        <span>{{todo.title}}</span>
      </label>
      <button (click)="remove.emit(todo)">x</button>
    </div>
  `,
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() remove = new EventEmitter<TodoItem>();
  @Input() todo: TodoItem;

  constructor() { }

  ngOnInit() {
  }

}
