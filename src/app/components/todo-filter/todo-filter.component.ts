import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterRecord, TodoFilter } from '../../models/filter.model';

@Component({
  selector: 'app-todo-filter',
  template: `
    <select [formControl]="filter" (change)="changeFilter.next(filter.value)">
      <option *ngFor="let filter of filters" [ngValue]="filter.id">{{filter.title}}</option>
    </select>
  `,
  styles: []
})
export class TodoFilterComponent implements OnInit {
  @Input() filters: FilterRecord[];
  @Output() changeFilter = new EventEmitter<TodoFilter>();
  filter: FormControl;

  constructor() {
    this.filter = new FormControl();
  }

  ngOnInit() {
  }

  @Input() set active( val: TodoFilter ) {
    this.filter.setValue(val);
  }

}
