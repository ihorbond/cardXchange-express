import { CardXchangePage } from './app.po';

describe('card-xchange App', () => {
  let page: CardXchangePage;

  beforeEach(() => {
    page = new CardXchangePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
