import { expect } from '@playwright/test';
import { test } from '../fixtures/pageFixtures';
import { logStep } from '../utils/logger';

test('User can view product details', async ({ homePage, productsPage, productsDetailsPage }) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();

  logStep('Verifying logo is visible');
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Navigating to Products Page');
  await productsPage.navigateToProductsPage();

  logStep('Verifying All Products header is visible');
  expect(await productsPage.isAllProductsHeaderVisible()).toBe(true);

  logStep('Verifying All Products list is visible');
  expect(await productsPage.isAllProductsListVisible()).toBe(true);

  logStep('Clicking on the first product view button');
  await productsPage.firstProductViewButtonClick();

  logStep('Verifying product details page is displayed');
  expect(await productsDetailsPage.areProductDetailsVisible()).toBe(true);

  logStep('Test flow completed successfully');
});
