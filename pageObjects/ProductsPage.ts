import { Page, Locator } from '@playwright/test';

export default class ProductsPage {
  readonly page: Page;
  readonly productsButton: Locator;
  readonly allProductsHeader: Locator;
  readonly productList: Locator;
  readonly firstViewProductButton: Locator;
  readonly firstItem: Locator;
  readonly secondItem: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsButton = page.locator('a[href="/products"]');
    this.allProductsHeader = page.locator('h2:has-text("All Products")');
    this.productList = page.locator('.features_items .product-image-wrapper ');
    this.firstViewProductButton = page.locator('a[href="/product_details/1"]');
    this.firstItem = page.locator('.product-image-wrapper').first();
    this.secondItem = page.locator('.features_items .product-image-wrapper').nth(1);
    this.continueShoppingButton = page.locator('.btn.btn-success.close-modal');
  }

  async navigateToProductsPage() {
    await this.productsButton.click();
  }

  async isAllProductsHeaderVisible() {
    return this.allProductsHeader.isVisible();
  }

  async isAllProductsListVisible() {
    const productCount = await this.productList.count();
    if (productCount === 0) return false;

    return await this.productList.first().isVisible();
  }

  async firstProductViewButtonClick() {
    await this.firstViewProductButton.click();
  }

  async addFirstItemToCart() {
    await this.firstItem.hover();
    const button = this.firstItem.locator('.overlay-content .add-to-cart');
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.waitFor({ state: 'visible' });
    await this.continueShoppingButton.click();
  }

  async addSecondItemToCart() {
    await this.secondItem.hover();
    const button = this.secondItem.locator('.overlay-content .add-to-cart');
    await button.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(300);
    await button.click();
  }
}
