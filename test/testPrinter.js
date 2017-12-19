var assert = require('assert');
var printer = require('../printer.js');
var sinon = require('sinon');

describe('#print', () => {
    it('prints string to the console', () => {
      var consoleSpy = sinon.spy(console, "log");
      printer.print("test string");
      assert(consoleSpy.calledWith("test string"));
      consoleSpy.restore();
    });
});
