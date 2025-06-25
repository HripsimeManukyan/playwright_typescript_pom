import { expect } from '@playwright/test';
import { test } from '../fixtures/pageFixtures';
import { logStep } from '../utils/logger';
import { generateRandomEmail } from '../utils/dataGenerator';

test('User can subscribe to the newsletter', async ({ homePage }) => {
  const email = generateRandomEmail();

  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Subscribing to the newsletter');
  await homePage.verifySubscription(email);
  expect(await homePage.successMessage.isVisible()).toBe(true);
});
