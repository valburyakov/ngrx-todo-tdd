import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem, TodoList } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  template: `
    <app-todo-item [todo]="todo"
              *ngFor="let todo of todos" (toggle)="toggle.emit($event)" (remove)="remove.emit($event)">
    </app-todo-item>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input() todos: TodoList;
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() remove = new EventEmitter<TodoItem>();

  constructor() { }

  ngOnInit() {
  }

}
