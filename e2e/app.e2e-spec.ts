import { NgrxTodoTddPage } from './app.po';

describe('ngrx-todo-tdd App', () => {
  let page: NgrxTodoTddPage;

  beforeEach(() => {
    page = new NgrxTodoTddPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
