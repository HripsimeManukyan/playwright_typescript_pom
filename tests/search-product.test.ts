import { expect } from '@playwright/test';
import { test } from '../fixtures/pageFixtures';
import { logStep } from '../utils/logger';

test('User can search for a product', async ({ homePage, productsPage, searchPage }) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Navigating to Products Page');
  await productsPage.navigateToProductsPage();
  expect(await productsPage.isAllProductsHeaderVisible()).toBe(true);

  logStep('Searching for a product');
  await searchPage.searchForProduct('Jeans');

  logStep('Verifying search results');
  expect(await searchPage.isSearchedProductsVisible()).toBe(true);
  expect(await searchPage.areAllSearchResultsVisible()).toBe(true);
});
