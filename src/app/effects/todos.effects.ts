import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { TodosService } from '../services/todos.service';
import { TodoActions } from '../actions/todo.actions';
import { getFilterState } from '../reducers/index';

@Injectable()
export class TodosEffects {
  constructor( private actions$: Actions,
               private todoActions: TodoActions,
               private todosService: TodosService,
               private store: Store<{}> ) {
  }

  @Effect() getTodos$ = this.actions$
    .ofType(TodoActions.GET_TODOS)
    .withLatestFrom(this.store.select(getFilterState), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => this.todoActions.getTodosSuccess(todos))
        .catch((error) => Observable.of(this.todoActions.getTodosError(error)))
    );

  @Effect() addTodo$ = this.actions$
    .ofType(TodoActions.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload)
        .map(todo => this.todoActions.addTodoSuccess(todo) )
        .catch((error) => Observable.of(this.todoActions.addTodoError(error)))
    );

  @Effect() toggleTodo$ = this.actions$
    .ofType(TodoActions.TOGGLE_COMPLETED)
    .switchMap(action =>
      this.todosService.updateTodo(action.payload)
        .map(todo => this.todoActions.toggleTodoSuccess(todo) )
        .catch((error) => Observable.of(this.todoActions.toggleTodoError(error)))
    );

  @Effect() removeTodo$ = this.actions$
    .ofType(TodoActions.REMOVE_TODO)
    .switchMap(action =>
      this.todosService.deleteTodo(action.payload)
        .map(() => this.todoActions.removeTodoSuccess(action.payload) )
        .catch((error) => Observable.of(this.todoActions.removeTodoError(error)))
    );

  @Effect({ dispatch: false })
  httpErrors$: Observable<any> = this.actions$
    .ofType(
      TodoActions.ADD_TODO_ERROR,
      TodoActions.GET_TODOS_ERROR,
      TodoActions.TOGGLE_COMPLETED_ERROR,
      TodoActions.REMOVE_TODO_ERROR
    ).map(action => action.payload)
    .switchMap(error => {
      return Observable.of(`There was an error accessing the server: ${error}`);
    });

}
