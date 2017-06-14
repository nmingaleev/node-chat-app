var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var message = generateMessage("Admin", "test");

    expect(message.from).toBe("Admin");
    expect(message.text).toBe("test");
    expect(message.createdAt).toBeA('number');
  })
});
