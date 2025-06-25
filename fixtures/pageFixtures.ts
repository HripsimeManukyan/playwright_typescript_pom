import { test as base } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import SignupLoginPage from '../pageObjects/SignupLoginPage';
import DashboardPage from '../pageObjects/DashboardPage';
import AccountInfoPage from '../pageObjects/AccountInfoPage';
import ContactUsPage from '../pageObjects/ContactUsPage';
import ProductsPage from '../pageObjects/ProductsPage';
import ProductsDetailsPage from '../pageObjects/ProductsDetailsPage';
import SearchPage from '../pageObjects/SearchPage';
import CartPage from '../pageObjects/CartPage';
import CheckoutPage from '../pageObjects/CheckoutPage';
import PaymentPage from '../pageObjects/PaymentPage';

interface PageFixtures {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  dashboardPage: DashboardPage;
  accountInfoPage: AccountInfoPage;
  contactUsPage: ContactUsPage;
  productsPage: ProductsPage;
  productsDetailsPage: ProductsDetailsPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
}
const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signupLoginPage: async ({ page }, use) => {
    const signupLoginPage = new SignupLoginPage(page);
    await use(signupLoginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  accountInfoPage: async ({ page }, use) => {
    const accountInfoPage = new AccountInfoPage(page);
    await use(accountInfoPage);
  },
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  productsDetailsPage: async ({ page }, use) => {
    const productsDetailsPage = new ProductsDetailsPage(page);
    await use(productsDetailsPage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
});

export { test };
export { expect } from '@playwright/test';
