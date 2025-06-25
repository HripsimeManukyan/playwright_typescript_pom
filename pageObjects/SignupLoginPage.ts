import { Page, Locator } from '@playwright/test';

export default class SignupLoginPage {
  readonly page: Page;
  readonly newUsertext: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUsertext = page.locator('h2:has-text("New User Signup!")');
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
  }

  async isNewUserTextVisible() {
    return await this.newUsertext.isVisible();
  }

  async signupWithDetails(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }
}
