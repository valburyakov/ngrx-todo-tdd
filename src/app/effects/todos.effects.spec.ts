import { TodosService } from '../services/todos.service';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { TodosEffects } from './todos.effects';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import filterReducer from '../reducers/visibilityFilter.reducer';
import { TodoActions } from '../actions/todo.actions';

describe('TodoEffects', () => {
  let runner;
  let todosEffects: TodosEffects;
  let todoActions: TodoActions;
  let todosService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      StoreModule.provideStore({filterReducer})
    ],
    providers: [
      TodosEffects,
      TodoActions,
      {
        provide: TodosService,
        useValue: jasmine.createSpyObj('todosService', ['getTodos', 'addTodo', 'updateTodo', 'deleteTodo'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    todosEffects = TestBed.get(TodosEffects);
    todosService = TestBed.get(TodosService);
    todoActions = TestBed.get(TodoActions);
  });

  it('getTodos$', () => {
    const todos = [
      {id: 1, title: 'Learn ngrx/store', completed: true},
      {id: 2, title: 'Learn ngrx/effects', completed: false}
    ];

    todosService.getTodos.and.returnValue(Observable.of(todos));

    const expectedResult = todoActions.getTodosSuccess(todos);

    runner.queue(todoActions.getTodos());

    todosEffects.getTodos$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('addTodo$', () => {
    const newTodo = {
      id: 111,
      title: 'New Item',
      completed: false
    };

    todosService.addTodo.and.returnValue(Observable.of(newTodo));
    const expectedResult = todoActions.addTodoSuccess(newTodo);

    runner.queue(todoActions.addTodo('new todo'));

    todosEffects.addTodo$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('toggleTodo$', () => {
    const todo = {
      id: 111,
      title: 'New Item',
      completed: false
    };

    todosService.updateTodo.and.returnValue(Observable.of(todo));
    const expectedResult = todoActions.toggleTodoSuccess(todo);

    runner.queue(todoActions.toggleTodo(todo));

    todosEffects.toggleTodo$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('removeTodo$', () => {
    const todo = {
      id: 111,
      title: 'New Item',
      completed: false
    };

    todosService.deleteTodo.and.returnValue(Observable.of(todo));
    const expectedResult = todoActions.removeTodoSuccess(todo);

    runner.queue(todoActions.removeTodo(todo));

    todosEffects.removeTodo$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });



});
