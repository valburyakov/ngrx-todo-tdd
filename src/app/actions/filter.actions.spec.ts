import { FilterActions } from './filter.actions';

describe('FilterActions', () => {

  const filterActions = new FilterActions();

  it('should create ', () => {
    const result = filterActions.changeFilter('SHOW_ALL');

    expect(result).toEqual({
      type: FilterActions.SET_VISIBILITY_FILTER,
      payload: 'SHOW_ALL'
    })
  });

});
