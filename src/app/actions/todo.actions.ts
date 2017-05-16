import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { TodoItem, TodoList } from '../models/todo.model';

@Injectable()
export class TodoActions {
  static GET_TODOS = 'GET_TODOS';
  static GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
  static GET_TODOS_ERROR = 'GET_TODOS_ERROR';

  static TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';
  static TOGGLE_COMPLETED_SUCCESS = 'TOGGLE_COMPLETED_SUCCESS';
  static TOGGLE_COMPLETED_ERROR = 'TOGGLE_COMPLETED_ERROR';

  static ADD_TODO = 'ADD_TODO';
  static ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
  static ADD_TODO_ERROR = 'ADD_TODO_ERROR';

  static REMOVE_TODO = 'REMOVE_TODO';
  static REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';
  static REMOVE_TODO_ERROR = 'REMOVE_TODO_ERROR';

  getTodos(): Action {
    return {
      type: TodoActions.GET_TODOS
    };
  }

  getTodosSuccess(todos: TodoList): Action {
    return {
      type: TodoActions.GET_TODOS_SUCCESS,
      payload: todos
    };
  }

  getTodosError(error): Action {
    return {
      type: TodoActions.GET_TODOS_ERROR,
      payload: error
    }
  }

  toggleTodo(todo: TodoItem): Action {
    return {
      type: TodoActions.TOGGLE_COMPLETED,
      payload: todo
    };
  }

  toggleTodoSuccess(todo: TodoItem): Action {
    return {
      type: TodoActions.TOGGLE_COMPLETED_SUCCESS,
      payload: todo
    };
  }

  toggleTodoError(error): Action {
    return {
      type: TodoActions.TOGGLE_COMPLETED_ERROR,
      payload: error
    };
  }

  addTodo(title: string): Action {
    return {
      type: TodoActions.ADD_TODO,
      payload: title
    };
  }

  addTodoSuccess(todo: TodoItem): Action {
    return {
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: todo
    }
  }

  addTodoError(error): Action {
    return {
      type: TodoActions.ADD_TODO_ERROR,
      payload: error
    }
  }

  removeTodo(todo: TodoItem): Action {
    return {
      type: TodoActions.REMOVE_TODO,
      payload: todo
    }
  }

  removeTodoSuccess(todo: TodoItem): Action {
    return {
      type: TodoActions.REMOVE_TODO_SUCCESS,
      payload: todo
    }
  }

  removeTodoError(error) {
    return {
      type: TodoActions.REMOVE_TODO_ERROR,
      payload: error
    }
  }
}
