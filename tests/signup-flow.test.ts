import { expect } from '@playwright/test';
import { test } from '../fixtures/pageFixtures';
import { testData } from '../fixtures/testData';
import { generateRandomEmail } from '../utils/dataGenerator';
import { logStep } from '../utils/logger';

test('User can sign up and delete account', async ({
  homePage,
  signupLoginPage,
  accountInfoPage,
  dashboardPage,
}) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();

  logStep('Verifying logo is visible');
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Clicking on Signup/Login button');
  await homePage.clickOnSignupLoginButton();

  logStep('Filling signup form');
  expect(await signupLoginPage.isNewUserTextVisible()).toBe(true);
  const name = testData.validName;
  const email = generateRandomEmail();
  await signupLoginPage.signupWithDetails(name, email);

  logStep('Filling account info form');
  expect(await accountInfoPage.isAccountInfoTextVisible()).toBe(true);
  await accountInfoPage.fillAccountInfoForm({
    title: 'Mr.',
    password: testData.password,
    day: testData.dateOfBirth.day,
    month: testData.dateOfBirth.month,
    year: testData.dateOfBirth.year,
    firstName: testData.firstName,
    lastName: testData.lastName,
    company: testData.company,
    address1: testData.address1,
    address2: testData.address2,
    country: testData.country,
    state: testData.state,
    city: testData.city,
    zipcode: testData.zipcode,
    mobileNumber: testData.mobileNumber,
  });

  logStep('Creating the account');
  await accountInfoPage.clickCreateAccountButton();

  logStep('Verifying account created and user is logged in');

  expect(await dashboardPage.isAccountCreatedMessageVisible()).toBe(true);
  await dashboardPage.clickContinueButton();
  expect(await dashboardPage.isLoggedInUserVisible()).toBe(true);

  logStep('Deleting the account');
  await dashboardPage.clickDeleteAccountButton();
  expect(await dashboardPage.isAccountDeletedMessageVisible()).toBe(true);

  logStep('Continuing after account deletion');
  await dashboardPage.clickContinueAfterDeletion();
  await expect(dashboardPage.page).toHaveURL(/\/$/);

  logStep('Test flow completed successfully');
});
