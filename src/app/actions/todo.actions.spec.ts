import { TodoActions } from './todo.actions';

describe('TodoActions', () => {
  let actions: TodoActions;

  beforeEach(() => {
    actions = new TodoActions();
  });

  it('should create GetTodos', () => {
    expect(actions.getTodos()).toEqual({type: TodoActions.GET_TODOS})
  });

  it('should create getTodosSuccess', () => {
    expect(actions.getTodosSuccess([])).toEqual({
      type: TodoActions.GET_TODOS_SUCCESS,
      payload: []
    });
  });

  it('should create addTodo', () => {
    const title = 'new todo';
    expect(actions.addTodo(title)).toEqual({
      type: TodoActions.ADD_TODO,
      payload: title
    });
  });

  it('should create addTodoSuccess', () => {
    const todo = {id: 123, title: '123', completed: false };
    expect(actions.addTodoSuccess(todo)).toEqual({
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: todo
    });
  });

  it('should create toggleTodoSuccess', () => {
    const todo = {id: 123, title: '123', completed: false };
    expect(actions.toggleTodoSuccess(todo)).toEqual({
      type: TodoActions.TOGGLE_COMPLETED_SUCCESS,
      payload: todo
    });
  });

});
