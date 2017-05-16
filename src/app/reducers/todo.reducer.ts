import { Action } from '@ngrx/store';

import { TodoList } from '../models/todo.model';
import { TodoActions } from '../actions/todo.actions';

export interface TodosState {
  data: TodoList;
  pending: boolean;
  error: string;
}

const initialState: TodosState = {
  data: [],
  pending: false,
  error: null
};

export const getItems = (state: TodosState) => state.data;
export const getError = (state: TodosState) => state.error;
export const getPending = (state: TodosState) => state.pending;

export default function todosReducer(state: TodosState = initialState, action: Action ): TodosState {
  switch ( action.type ) {
    case TodoActions.GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});
    case TodoActions.GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});
    case TodoActions.GET_TODOS_ERROR:
    case TodoActions.ADD_TODO_ERROR:
      return Object.assign({}, state, {pending: false, error: action.payload});
    case TodoActions.TOGGLE_COMPLETED_SUCCESS:
      return Object.assign({}, state,
        {
          data: state.data.map(todo => {
            if (todo.id !== action.payload.id) {
              return todo;
            }

            return Object.assign({}, todo, {completed: !todo.completed});
          })
        });
    case TodoActions.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {data: [...state.data, action.payload]});
    case TodoActions.REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, {data: state.data.filter(todo => todo.id !== action.payload.id)});
    default:
      return state;
  }
}
