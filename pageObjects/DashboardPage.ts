import { Page, Locator } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;
  readonly accountCreatedMessage: Locator;
  readonly continueButton: Locator;
  readonly loggedInUser: Locator;
  readonly deleteAccountButton: Locator;
  readonly acccountDeletedMessage: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountCreatedMessage = page.locator('h2.title.text-center');
    this.continueButton = page.locator('a.btn.btn-primary');
    this.loggedInUser = page.locator('a:has-text("Logged in as John Doe")');
    this.deleteAccountButton = page.locator('a[href="/delete_account"]');
    this.acccountDeletedMessage = page.locator('h2:has-text("Account Deleted!")');
    this.cartButton = page.getByRole('link', { name: 'Cart' });
  }

  async isAccountCreatedMessageVisible() {
    return await this.accountCreatedMessage.isVisible();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async isLoggedInUserVisible() {
    return await this.loggedInUser.isVisible();
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

  async clickDeleteAccountButton() {
    await this.deleteAccountButton.click();
  }

  async isAccountDeletedMessageVisible() {
    return await this.acccountDeletedMessage.isVisible();
  }

  async clickContinueAfterDeletion() {
    await this.continueButton.click();
  }
}
