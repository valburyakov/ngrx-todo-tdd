import { Component, OnInit } from '@angular/core';
import { FilterRecord, TodoFilter } from '../../models/filter.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import { TodosState } from '../../reducers/todo.reducer';
import { Action, Store } from '@ngrx/store';
import { TodoActions } from '../../actions/todo.actions';
import { FilterActions } from '../../actions/filter.actions';
import { TodosEffects } from '../../effects/todos.effects';
import { TodosService } from '../../services/todos.service';
import { AppState, getFilterState, getTodosState } from '../../reducers';
import { TodoItem, TodoList } from '../../models/todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  todos$: Observable<TodoList>;
  addTodoSuccess$: Observable<Action>;
  activeFilter$: Observable<TodoFilter>;
  error$: Observable<string>;

  filters: FilterRecord[] = [{id: 'SHOW_ALL', title: 'All'}, {id: 'SHOW_COMPLETED', title: 'Completed'}, {
    id: 'SHOW_ACTIVE',
    title: 'Active'
  }];

  constructor(private store: Store<AppState>,
              private todoActions: TodoActions,
              private filterActions: FilterActions,
              private todosEffects: TodosEffects,
              private todoService: TodosService) {
    this.store.dispatch(todoActions.getTodos());
    this.activeFilter$ = store.select(getFilterState);
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(( { type }) => type === TodoActions.ADD_TODO_SUCCESS);
    this.todos$ = Observable.combineLatest(this.store.select(getTodosState), this.activeFilter$,
      (todos: TodosState , filter: TodoFilter): TodoList => {
        return this.todoService.getVisibleTodos(todos.data, filter)
      }
    );

    this.error$= this.todosEffects.httpErrors$;
  }

  ngOnInit() {
  }

  toggleTodo(todo: TodoItem) {
    this.store.dispatch(this.todoActions.toggleTodo(todo));
  }

  addTodo(title: string) {
    this.store.dispatch(this.todoActions.addTodo(title));
  }

  removeTodo(todo: TodoItem) {
    this.store.dispatch(this.todoActions.removeTodo(todo));
  }

  changeFilter(filter: TodoFilter) {
    this.store.dispatch(this.filterActions.changeFilter(filter));
  }

}
