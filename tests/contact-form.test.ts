import { expect } from '@playwright/test';
import { test } from '../fixtures/pageFixtures';
import { generateRandomEmail } from '../utils/dataGenerator';
import { generateRandomName } from '../utils/dataGenerator';
import { generateMessage } from '../utils/dataGenerator';
import { logStep } from '../utils/logger';
import path from 'path';

test('User can fill contact form', async ({ homePage, contactUsPage }) => {
  const name = generateRandomName();
  const email = generateRandomEmail();
  const subject = 'Test Subject';
  const message = generateMessage();
  const filePath = path.resolve('testFiles/sample.txt');

  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();

  logStep('Navigating to Contact Us Page');
  await contactUsPage.navigateToConactPage();
  await expect(contactUsPage.getInTouchMessage).toBeVisible();

  logStep('Filling contact form with file upload');
  await contactUsPage.fillContactForm(name, email, subject, message);
  await contactUsPage.uploadFile(filePath);
  await contactUsPage.clickSubmitButton();
  await contactUsPage.handleAlert('Press OK to proceed!');

  logStep('Verifying success message');
  await contactUsPage.isSuccessMessageVisible();

  logStep('Navigating back to Home Page');
  await contactUsPage.homeButton.click();
  await contactUsPage.isHomePageLogoVisible();

  logStep('Test flow completed successfully');
});
