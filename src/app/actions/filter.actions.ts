import { Injectable } from '@angular/core';
import { TodoFilter } from '../models/filter.model';

@Injectable()
export class FilterActions {
  static SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

  changeFilter(filter: TodoFilter) {
    return {
      type: FilterActions.SET_VISIBILITY_FILTER,
      payload: filter
    }
  }
}
