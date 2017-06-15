var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var message = generateMessage("Admin", "test");

    expect(message.from).toBe("Admin");
    expect(message.text).toBe("test");
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var message = generateLocationMessage('User', 39.9, 40);

    expect(message.from).toBe('User');
    expect(message.url).toBe(`https://www.google.com/maps?q=39.9,40`);
    expect(message.createdAt).toBeA('number');
  });
});
