import { GiftdibsBrowserPage } from './app.po';

describe('giftdibs-browser App', function() {
  let page: GiftdibsBrowserPage;

  beforeEach(() => {
    page = new GiftdibsBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
