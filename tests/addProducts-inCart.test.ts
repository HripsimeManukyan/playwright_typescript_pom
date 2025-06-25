import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { logStep } from '../utils/logger';

test('Add products to cart', async ({ homePage, productsPage, cartPage }) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Navigating to Products Page');
  await productsPage.navigateToProductsPage();
  expect(await productsPage.isAllProductsHeaderVisible()).toBe(true);

  logStep('Adding  products to cart');
  await productsPage.addFirstItemToCart();
  await productsPage.clickContinueShopping();
  await productsPage.addSecondItemToCart();

  logStep('Navigating to Cart Page');
  await cartPage.navigateToCartPage();
  await cartPage.verifyProductsInTheCart();
  await cartPage.verifyProductDetails('Blue Top', 'Rs. 500', '1');
  await cartPage.verifyProductDetails('Men Tshirt', 'Rs. 400', '1');
});
