const test_js = require('../app/js/test');

describe('Tests', function() {
  it('adds two numbers', function(){
    const number = test_js.add(2,2);
    expect(number).toEqual(4);
  });

  it('subtracts two numbers', function() {
    const number = test_js.subtract(5, 10);
    expect(number).toEqual(5);
  });
});
