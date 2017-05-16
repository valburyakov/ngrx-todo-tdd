import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageComponent } from './todo-page.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';
import { TodoAddComponent } from '../../components/todo-add/todo-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { TodosEffects } from '../../effects/todos.effects';
import { MockStore } from '../../testing/mock-store';
import { AppState } from '../../reducers/index';
import { TodoFilter } from '../../models/filter.model';
import { TEST_DATA } from '../../testing/test.data';
import { TodoList } from '../../models/todo.model';
import { TodoActions } from '../../actions/todo.actions';
import { FilterActions } from '../../actions/filter.actions';
import { EffectsModule } from '@ngrx/effects';
import { TodosService } from '../../services/todos.service';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let mockStore: MockStore<AppState>;
  let todoActions: TodoActions;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    const initialState = {
      todos: {
        data: [],
        pending: false,
        error: null,
      },
      filter: 'SHOW_ALL' as TodoFilter
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore({}),
        EffectsModule
      ],
      declarations: [ TodoPageComponent, TodoListComponent, TodoItemComponent, TodoFilterComponent, TodoAddComponent ],
      providers: [
        TodosEffects,
        TodoActions,
        FilterActions,
        {
          provide: TodosService,
          useValue: jasmine.createSpyObj('todosService', ['getVisibleTodos'])
        },
        { provide: Store, useValue: new MockStore<AppState>(initialState)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const todoService = TestBed.get(TodosService);
    todoService.getVisibleTodos.and.returnValue(TEST_DATA.todos);
    mockStore = TestBed.get(Store);
    todoActions = TestBed.get(TodoActions);
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle todo item', () => {
    const todoToToggle = TEST_DATA.todos[0];
    component.toggleTodo(todoToToggle);

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.toggleTodo(todoToToggle))
  });

  it('should add new todo', () => {
    const newTitle = 'new todo';
    component.addTodo(newTitle);

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.addTodo(newTitle));
  });

  it('should remove todo item', () => {
    const todoToRemove = TEST_DATA.todos[0];
    component.removeTodo(todoToRemove);

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.removeTodo(todoToRemove))
  });

  it('should set new filter', () => {
    const filterActions: FilterActions = TestBed.get(FilterActions);
    const newFilter = 'SHOW_COMPLETED';

    component.changeFilter(newFilter);
    expect(dispatchSpy).toHaveBeenCalledWith(filterActions.changeFilter(newFilter));
  });

});
