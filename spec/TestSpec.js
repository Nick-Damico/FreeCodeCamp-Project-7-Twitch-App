const test_js = require('../app/scripts/app');

describe('Tests', function() {
  it('divides two numbers', function() {
    const number = test_js.divide(10,5);
    expect(number).toEqual(2);
  })
});
