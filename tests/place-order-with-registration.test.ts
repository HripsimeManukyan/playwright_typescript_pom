import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { logStep } from '../utils/logger';
import { testData } from '../fixtures/testData';
import { generateRandomEmail } from '../utils/dataGenerator';
import { generateMessage } from '../utils/dataGenerator';
import { generateCardDetails } from '../utils/dataGenerator';
import { log } from 'console';

test.only('Place order while registering during checkout', async ({
  homePage,
  cartPage,
  dashboardPage,
  accountInfoPage,
  productsPage,
  signupLoginPage,
  checkoutPage,
  paymentPage,
}) => {
  logStep('Navigating to Home Page');
  await homePage.navigateToHomePage();

  logStep('Verifying logo is visible');
  expect(await homePage.isLogoVisible()).toBe(true);

  logStep('Adding  products to cart');
  await productsPage.addFirstItemToCart();

  logStep('Navigating to cart page');
  await cartPage.navigateToCartPage();
  await cartPage.verifyCartPageIsDisplayed;
  await cartPage.clickCheckoutButton();
  await cartPage.clickRegisterLoginButtonFromCheckoutModal();

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
  await dashboardPage.clickCartButton();

  logStep('Navigate to Checkout page');
  await cartPage.clickCheckoutButton();
  await checkoutPage.verifyAddressDetails(
    testData.firstName,
    testData.country,
    testData.mobileNumber
  );
  await checkoutPage.verifyOrderReview(
    testData.productName,
    testData.price,
    testData.quantity,
    testData.total
  );
  await checkoutPage.enterComment(generateMessage());
  await checkoutPage.placeOrder();

  logStep('Navigating to Payment Page');
  await paymentPage.verifyPaymentPageIsDisplayed();
  await paymentPage.enterPaymentDetails(
    generateCardDetails().name,
    generateCardDetails().cardNumber,
    generateCardDetails().cvc,
    generateCardDetails().expMonth,
    generateCardDetails().expYear
  );
  await paymentPage.clickPayAndConfirmButton();
  await paymentPage.verifyPaymentSuccessMessage();

  logStep('Deleting the account');
  await dashboardPage.clickDeleteAccountButton();
  expect(await dashboardPage.isAccountDeletedMessageVisible()).toBe(true);
});
