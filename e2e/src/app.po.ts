import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .main-title')).getText();
  }

  async getNotesCount(): Promise<number> {
    return element.all(by.css('app-notes-list p')).count()
  }

  async getFirstNoteText(): Promise<string> {
    return element(by.css('app-note textarea')).getText();
  }
}
