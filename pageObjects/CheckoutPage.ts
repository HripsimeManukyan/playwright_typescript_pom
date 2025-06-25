import { Page, Locator, expect } from '@playwright/test';

export default class CheckoutPage {
  readonly page: Page;
  readonly deliveryAddressBox: Locator;
  readonly billingAddressBox: Locator;
  readonly reviewOrderTitle: Locator;
  readonly orderRow: Locator;
  readonly placeOrderComment: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryAddressBox = page.locator('#address_delivery');
    this.billingAddressBox = page.locator('#address_invoice');
    this.reviewOrderTitle = page.locator('h2:has-text("Review Your Order")');
    this.orderRow = page.locator('tr:has(a[href*="product_details"])').first();
    this.placeOrderComment = page.locator('textarea.form-control');
    this.placeOrderButton = page.locator('a.btn.btn-default.check_out');
  }

  async verifyAddressDetails(expectedName: string, expectedCountry: string, expectedPhone: string) {
    const deliveryAddress = await this.deliveryAddressBox.textContent();
    const billingAddress = await this.billingAddressBox.textContent();

    expect(deliveryAddress).toContain(expectedName);
    expect(deliveryAddress).toContain(expectedCountry);
    expect(deliveryAddress).toContain(expectedPhone);

    expect(billingAddress).toContain(expectedName);
    expect(billingAddress).toContain(expectedCountry);
    expect(billingAddress).toContain(expectedPhone);
  }

  async verifyOrderReview(
    expectedProduct: string,
    expectedPrice: string,
    expectedQuantity: string,
    expectedTotal: string
  ) {
    await expect(this.reviewOrderTitle).toBeVisible();
    await expect(this.orderRow.locator('td').nth(1)).toContainText(expectedProduct);
    await expect(this.orderRow.locator('td').nth(2)).toContainText(expectedPrice);
    await expect(this.orderRow.locator('td').nth(3)).toContainText(expectedQuantity);
    await expect(this.orderRow.locator('td').nth(4)).toContainText(expectedTotal);
  }

  enterComment(comment: string) {
    this.placeOrderComment.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
