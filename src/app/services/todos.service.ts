import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TodoItem } from '../models/todo.model';

const BASE_URL = 'http://localhost:3000/todos/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class TodosService {

  constructor(private http: Http) { }

  getTodos( filter ) {
    return this.http.get(BASE_URL)
      .map(res => this.getVisibleTodos(res.json(), filter))
  }

  getVisibleTodos( todos, filter ) {
    if ( filter === 'SHOW_ALL' ) {
      return todos;
    } else if ( filter === 'SHOW_COMPLETED' ) {
      return todos.filter(t => t.completed);
    } else {
      return todos.filter(t => !t.completed);
    }
  }

  addTodo( title: string ) {
    return this.http.post(`${BASE_URL}`, JSON.stringify({id: Math.floor(100000 + Math.random() * 900000), title, completed: false}), HEADER)
      .map(res => res.json());
  }

  updateTodo(item: TodoItem) {
    return this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
  }

  deleteTodo(item: TodoItem) {
    return this.http.delete(`${BASE_URL}${item.id}`)
      .map(res => res.json())
  }
}
