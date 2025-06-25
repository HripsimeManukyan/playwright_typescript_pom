import { Page, Locator, expect } from '@playwright/test';

export default class ContactUsPage {
  readonly page: Page;
  readonly contactUsButton: Locator;
  readonly getInTouchMessage: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly okButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;
  readonly homePagelogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactUsButton = page.locator('a[href="/contact_us"]');
    this.getInTouchMessage = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator(
      'h2:has-text("Success! Your details have been submitted successfully.")'
    );
    this.homeButton = page.getByRole('link', { name: 'Home' });
    this.homePagelogo = page.locator('.logo.pull-left');
  }

  async navigateToConactPage() {
    await this.contactUsButton.click();
  }

  async isGetInTouchMessageVisible() {
    return await this.getInTouchMessage.isVisible();
  }

  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }
  async uploadFile(filePath: string) {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async handleAlert(expectedMessage?: string) {
    this.page.on('dialog', async (dialog) => {
      if (expectedMessage) {
        expect(dialog.message()).toBe(expectedMessage);
      }
      await dialog.accept();
    });
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  clickHomeButton() {
    return this.homeButton.click();
  }

  async isHomePageLogoVisible() {
    return await this.homePagelogo.isVisible();
  }
}
