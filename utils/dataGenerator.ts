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
