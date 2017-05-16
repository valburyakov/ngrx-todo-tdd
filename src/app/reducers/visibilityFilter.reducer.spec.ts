import filterReducer from './visibilityFilter.reducer';
import { FilterActions } from '../actions/filter.actions';

describe('FilterReducer', () => {
  const filterActions = new FilterActions();

  it('should set new filter', () => {
    const newFilter = 'SHOW_COMPLETED';
    const actual = filterReducer('SHOW_ALL', filterActions.changeFilter(newFilter));

    expect(actual).toEqual(newFilter);
  });
});
