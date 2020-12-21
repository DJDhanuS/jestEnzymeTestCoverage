import { groupBy, generateUUID, setDateFormat } from '../../../../src/utils/AppUtils';

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});
describe('<Activator> component', () => {
  test('Test getUUID', () => {
    const cars = [
      { make: 'audi', model: 'r8', year: '2012' },
      { make: 'audi', model: 'rs5', year: '2013' },
      { make: 'ford', model: 'mustang', year: '2012' },
      { make: 'ford', model: 'fusion', year: '2015' },
      { make: 'kia', model: 'optima', year: '2012' },
    ];

    const res = groupBy(cars, (obj) => obj.make);
    expect(res).toBeTruthy();
  });

  test('Test generateUUID', () => {
    const res = generateUUID();
    expect(res).toBeTruthy();
  });

  test('Test setDateFormat', () => {
    const res = setDateFormat(1610155800000);
    expect(res).toBeTruthy();
  });
});
