import { generateRandomEmail } from '../utils/dataGenerator';

export const testData = {
  validName: 'John Doe',
  validEmail: generateRandomEmail(),
  password: 'SecurePass123!',
  dateOfBirth: {
    day: '5',
    month: '5',
    year: '1994',
  },
  firstName: 'John',
  lastName: 'Doe',
  company: 'TestCompany Inc.',
  address1: '123 Main St, Suite 4B',
  address2: 'Building B, Floor 2',
  country: 'United States',
  state: 'New York',
  city: 'New York',
  zipcode: '110001',
  mobileNumber: '+919876543210',
  productName: 'Blue Top',
  price: 'Rs. 500',
  quantity: '1',
  total: 'Rs. 500',
};
