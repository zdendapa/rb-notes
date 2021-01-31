import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('Test some functions -CS-', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct title', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toContain('RB poznámky');
  });

  it('should contains 4 notes', async () => {
    expect(await page.getNotesCount()).toEqual(4);
  });

  it('click on the first one it routes to the detail. Check text of the note', async () => {
    await element.all(by.css('app-notes-list p')).first().click();
    expect(await page.getFirstNoteText()).toEqual('Poznámka 1');
  });

  it('on click the delete button, the note list should contain one less note', async () => {
    await element(by.cssContainingText('app-note button', 'SMAZAT')).click();
    expect(await page.getNotesCount()).toEqual(3);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
