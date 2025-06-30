import { Page, expect, Locator } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly productRows: Locator;
  readonly viewCartModalButton: Locator;
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutModal: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewCartModalButton = page.locator('.modal-content a:has-text("View Cart")');
    this.productRows = page.locator('#cart_info_table tbody tr');
    this.cartTitle = page.locator('.breadcrumb li.active');
    this.checkoutButton = page.locator('a.btn.btn-default.check_out');
    this.checkoutModal = page.locator('#checkoutModal a:has-text("Register / Login")');
    this.cartButton = page.getByRole('link', { name: 'Cart' });

  }

  async navigateToCartPage() {
    await this.viewCartModalButton.click();
  }

  async verifyCartPageIsDisplayed(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Shopping Cart');
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async verifyProductsInTheCart() {
    const productNumber = await this.productRows.count();
    return productNumber === 2;
  }

  async clickRegisterLoginButtonFromCheckoutModal() {
    await this.checkoutModal.click();
  }

  async verifyProductDetails(
    productName: string,
    expectedPrice: string,
    expectedQuantity: string
  ): Promise<void> {
    const productRow = this.productRows.filter({ hasText: productName });
    await expect(productRow).toBeVisible();
    await expect(productRow.locator('.cart_price')).toContainText(expectedPrice);
    await expect(productRow.locator('.cart_quantity button')).toContainText(expectedQuantity);
  }

  async verifyProductQuantity(productName: string, expectedQuantity: string): Promise<void> {
    const productRow = this.productRows.filter({ hasText: productName });
    await expect(productRow).toBeVisible();
    await expect(productRow.locator('.cart_quantity button')).toHaveText(expectedQuantity);
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

  async removeMultipleProducts(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      const rowCount = await this.productRows.count();

      for (let i = 0; i < rowCount; i++) {
        const row = this.productRows.nth(i);
        const nameElement = row.locator(`text=${productName}`);

        if (await nameElement.isVisible()) {
          const deleteButton = row.locator('.cart_quantity_delete');
          await deleteButton.click();
          break;
        }
      }
    }
  }

 async assertCartIsEmpty(): Promise<void> {
    await expect(this.page.locator('text=Cart is empty')).toBeVisible();
  }

}
