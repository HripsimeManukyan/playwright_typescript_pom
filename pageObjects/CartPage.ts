import { Page, expect, Locator } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly productRows: Locator;
  readonly viewCartModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewCartModalButton = page.locator('.modal-content a:has-text("View Cart")');
    this.productRows = page.locator('#cart_info_table tbody tr');
  }

  async navigateToCartPage() {
    await this.viewCartModalButton.click();
  }

  async verifyProductsInTheCart() {
    const productNumber = await this.productRows.count();
    return productNumber === 2;
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
}
