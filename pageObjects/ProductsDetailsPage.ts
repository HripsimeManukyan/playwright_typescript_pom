import { Page, Locator } from '@playwright/test';

export default class ProductsDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly productQuantity: Locator;
  readonly addtoCartButton: Locator;
  readonly viewCartModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('p:has-text("Category")');
    this.productPrice = page.locator('span span');
    this.productAvailability = page.locator('p:has-text("Availability")');
    this.productCondition = page.locator('p:has-text("Condition")');
    this.productBrand = page.locator('p:has-text("Brand")');
    this.productQuantity = page.locator('#quantity');
    this.addtoCartButton = page.locator('button.btn.btn-default.cart');
    this.viewCartModalButton = page.locator('.modal-content a:has-text("View Cart")');
  }

  async areProductDetailsVisible() {
    const elements = [
      this.productName,
      this.productCategory,
      this.productPrice,
      this.productAvailability,
      this.productCondition,
      this.productBrand,
    ];

    for (const element of elements) {
      if (!(await element.isVisible())) {
        return false;
      }
    }
    return true;
  }

  async setProductQuantity(quantity: number) {
    await this.productQuantity.fill(quantity.toString());
  }

  async clickAddToCartButton() {
    await this.addtoCartButton.click();
  }

  async clickViewCartFromModal() {
    await this.viewCartModalButton.click();
  }
}
