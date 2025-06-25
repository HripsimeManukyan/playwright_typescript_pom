import { Page, Locator } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly logoasserted: Locator;
  readonly signupLoginButton: Locator;
  readonly footer: Locator;
  readonly subscribeInput: Locator;
  readonly subscribeButton: Locator;
  readonly successMessage: Locator;
  readonly viewProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoasserted = page.locator('.logo.pull-left');
    this.signupLoginButton = page.locator('a[href="/login"]');
    this.footer = page.locator('#footer');
    this.subscribeInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.successMessage = page.locator('text=You have been successfully subscribed!');
    this.viewProductButton = page.locator('a[href="/product_details/1"]');
  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }

  async clickOnSignupLoginButton() {
    await this.signupLoginButton.click();
  }

  async isLogoVisible() {
    return await this.logoasserted.isVisible();
  }

  async verifySubscription(email: string) {
    await this.footer.scrollIntoViewIfNeeded();
    await this.subscribeInput.fill(email);
    await this.subscribeButton.click();
  }

  async verifySuccessMessage() {
    return await this.successMessage.isVisible();
  }
  
  async clickFirstProductViewButton() {
    await this.viewProductButton.click();
  }
}
