import todosReducer, * as fromTodos from './todo.reducer';

import { TodoActions } from '../actions/todo.actions';
import { TodoItem, TodoList } from '../models/todo.model';

describe('TodosReducer', () => {
  let actual;
  const todoActions = new TodoActions();

  const todos: TodoList = [
    {id: 1, title: 'Item 1', completed: false},
    {id: 1, title: 'Item 1', completed: false}
  ];

  const state = {
    data: todos.slice(),
    pending: false,
    error: 'Some error'
  };

  it('GET_TODOS', () => {
    actual = todosReducer({
      data: [],
      pending: false,
      error: null
    }, todoActions.getTodos() );

    expect(actual.pending).toBeTruthy();
    expect(actual.data).toEqual([]);
  });

  it('GET_TODOS_SUCCESS', () => {
    actual = todosReducer({
      data: [],
      pending: false,
      error: null
    }, todoActions.getTodosSuccess(todos));

    expect(actual.data).toEqual(todos);
  });

  it('TOGGLE_COMPLETED_SUCCESS', () => {
    const todo = todos[0];
    const completed = todos[0].completed;

    actual = todosReducer(state, todoActions.toggleTodoSuccess(todo));

    expect(actual.data[0].completed).toBe(!completed);
  });

  it('REMOVE_TODO_SUCCESS', () => {
    const todoToRemove = todos[1];
    actual = todosReducer(state, todoActions.removeTodoSuccess(todoToRemove));

    expect(actual.data.includes(todoToRemove)).toBeFalsy();
  });

  it('ADD_TODO_SUCCESS', () => {
    const todo: TodoItem = {id: 123, title: 'new item', completed: false};
    actual = todosReducer(state, todoActions.addTodoSuccess(todo));

    expect(actual.data[todos.length]).toEqual(todo)
  });

  describe('Selections', () => {

    it('getTodosState', () => {
      const result = fromTodos.getItems(state);

      expect(result).toEqual(todos);
    });

    it('getError', () => {
      const result = fromTodos.getError(state);

      expect(result).toEqual(state.error);
    });

    it('getPending', () => {
      const result = fromTodos.getPending(state);

      expect(result).toEqual(state.pending);
    });

  });

});
