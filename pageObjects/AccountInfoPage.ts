import { Page, Locator } from '@playwright/test';

export default class AccountInfoPage {
  readonly page: Page;
  readonly accountInfoText: Locator;
  readonly titleRadioButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly password: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly signupNewsletterCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountInfoText = page.getByRole('heading', {
      level: 2,
      name: 'Enter Account Information',
    });
    this.titleRadioButton = page.locator('#id_gender1');
    this.password = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.signupNewsletterCheckbox = page.locator('#newsletter');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.addressInput = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async isAccountInfoTextVisible() {
    return await this.accountInfoText.isVisible();
  }

  async fillAccountInfoForm({
    title,
    password,
    day,
    month,
    year,
    firstName,
    lastName,
    company,
    address1,
    address2,
    country,
    state,
    city,
    zipcode,
    mobileNumber,
  }: {
    title: string;
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.titleRadioButton.check(title === 'Mr' ? { force: true } : undefined);

    await this.password.fill(password);

    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption(month);
    await this.yearSelect.selectOption(year);

    if (!(await this.signupNewsletterCheckbox.isChecked())) {
      await this.signupNewsletterCheckbox.check();
    }

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.companyInput.fill(company);

    await this.addressInput.fill(address1);

    if (address2) {
      await this.address2Input.fill(address2);
    }

    await this.countrySelect.selectOption(country);

    await this.stateInput.fill(state);

    await this.cityInput.fill(city);

    await this.zipcodeInput.fill(zipcode);

    await this.mobileNumberInput.fill(mobileNumber);
  }

  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }
}
