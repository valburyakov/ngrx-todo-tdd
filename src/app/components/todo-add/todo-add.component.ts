import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  template: `
    <input type="text" placeholder="Add todo.." [formControl]="control">
    <button (click)="addNew()">Add</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAddComponent implements OnInit {
  control : FormControl = new FormControl('');
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @Input()
  public set reset( action ) {
    action && this.control.reset();
  }

  addNew() {
    if (this.control.value) {
      this.add.next(this.control.value)
    }
  }

}
