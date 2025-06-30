import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { logStep } from '../utils/logger';

test('Remove product from cart', async ({ homePage, productsPage, cartPage }) => {
  const productsToRemove = ['Men Tshirt', 'Blue Top'];
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Adding Products to Cart');
  await productsPage.addFirstItemToCart();
  await productsPage.clickContinueShopping();
  await productsPage.addSecondItemToCart();

  logStep('Removing Products from Cart');
  await cartPage.clickCartButton();
  await expect(cartPage.cartTitle).toHaveText('Shopping Cart');
  await cartPage.removeMultipleProducts(productsToRemove);
  await cartPage.assertCartIsEmpty();
});
