import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { logStep } from '../utils/logger';

test.only('Verify Product Quantity in Cart', async ({
  homePage,
  cartPage,
  productsDetailsPage,
}) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Navigating to Products Detail Page');
  await homePage.clickFirstProductViewButton();
  expect(await productsDetailsPage.areProductDetailsVisible()).toBe(true);
  await productsDetailsPage.setProductQuantity(4);
  await productsDetailsPage.clickAddToCartButton();

  logStep('Navigating to Cart Page');
  await productsDetailsPage.clickViewCartFromModal();
  await cartPage.verifyProductQuantity('Blue Top', '4');
});
