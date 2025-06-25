import { Page, Locator } from '@playwright/test';

export default class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProducts: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProducts = page.locator('h2:has-text("Searched Products")');
    this.searchResults = page.locator('.features_items .product-image-wrapper');
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async isSearchedProductsVisible() {
    return this.searchedProducts.isVisible();
  }
  
  async areAllSearchResultsVisible() {
    const resultCount = await this.searchResults.count();
    if (resultCount === 0) return false;

    for (let i = 0; i < resultCount; i++) {
      if (!(await this.searchResults.nth(i).isVisible())) {
        return false;
      }
    }

    return true;
  }
}
