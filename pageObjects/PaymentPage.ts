import { Page, Locator, expect } from '@playwright/test';

export default class PaymentPage {
  readonly page: Page;
  readonly paymentTitle: Locator;
  readonly cardNumberInput: Locator;
  readonly cardNameInput: Locator;
  readonly cardExpiryMonthInput: Locator;
  readonly cardExpiryYearInput: Locator;
  readonly cardCVCInput: Locator;
  readonly payAndConfirmButton: Locator;
  readonly paymentSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentTitle = page.locator("h2:has-text('Payment')");
    this.cardNameInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cardExpiryMonthInput = page.locator('input[name="expiry_month"]');
    this.cardExpiryYearInput = page.locator('input[name="expiry_year"]');
    this.cardCVCInput = page.locator('input[name="cvc"]');
    this.payAndConfirmButton = page.locator('button[data-qa="pay-button"]');
    this.paymentSuccessMessage = page.getByRole('heading', { name: 'Order Placed!' });
  }

  async verifyPaymentPageIsDisplayed(): Promise<void> {
    return expect(this.paymentTitle).toBeVisible();
  }
  async enterPaymentDetails(
    cardName: string,
    cardNumber: string,
    cardCVC: string,
    cardExpiryMonth: string,
    cardExpiryYear: string
  ): Promise<void> {
    await this.cardNameInput.fill(cardName);
    await this.cardNumberInput.fill(cardNumber);
    await this.cardCVCInput.fill(cardCVC);
    await this.cardExpiryMonthInput.fill(cardExpiryMonth);
    await this.cardExpiryYearInput.fill(cardExpiryYear);
  }

  async clickPayAndConfirmButton(): Promise<void> {
    await this.payAndConfirmButton.click();
  }
  async verifyPaymentSuccessMessage(): Promise<void> {
    await expect(this.paymentSuccessMessage).toBeVisible({ timeout: 10000 });
  }
}
