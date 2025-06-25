import { faker } from '@faker-js/faker';

export function generateRandomEmail() {
  return faker.internet.email();
}

export function generateRandomName() {
  return faker.person.fullName();
}

export function generateMessage() {
  return faker.lorem.sentence();
}
export function generateCardDetails() {
  return {
    name: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber('################'),
    cvc: faker.finance.creditCardCVV(),
    expMonth: String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0'),
    expYear: String(new Date().getFullYear() + 2),
  };
}
