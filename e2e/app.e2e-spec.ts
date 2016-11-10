import { StocksWatchPage } from './app.po';

describe('stocks-watch App', function() {
  let page: StocksWatchPage;

  beforeEach(() => {
    page = new StocksWatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
