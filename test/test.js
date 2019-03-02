const request = require('request-promise');
const {expect} = require('chai');
require('../example');

before(async function() {
  this.response = await request.get('http://localhost:3000');
});

it('should render successfully', function() {
  expect(this.response).to.equal('<html><head></head><body><div data-reactroot="">Hello<!-- -->developer</div></body></html>');
});