import { GiftdibsBrowserPage } from './app.po';

describe('giftdibs-browser App', () => {
  let page: GiftdibsBrowserPage;

  beforeEach(() => {
    page = new GiftdibsBrowserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
