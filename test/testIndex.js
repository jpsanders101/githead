// import run, { UP, DOWN, ENTER } from 'inquirer-test';
var assert = require('assert');
var index = require('../index.js');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var inquirer_test = require('inquirer-test');
console.log(inquirer_test);

describe('.init', function () {
  it('returns a helpful message about "git init" to the command line', function () {
    var consoleSpy = sinon.spy(console, "log");
    index.init();
    assert(consoleSpy.calledWith("Helpful message about how git works"));
    console.log.restore();
  });
  it('executes "git init"', function () {

    var index = proxyquire('../index.js', {
      'child_process': {
        spawnSync: function (command, args) {
                      return {
                        stdout: {
                          toString: () => "git init success string"
                        }
                      };
                    }
      }
    });

    sinon.assert.match(index.init(), "git init success string");
  });
});


describe('.pull', function () {
  it('returns a helful message about "git pull" to the command line', function () {
    var consoleSpy = sinon.spy(console, "log");
    index.pull();
    assert(consoleSpy.calledWith("Helpful message about how git pull works"));
    console.log.restore();
  });
});

describe('.pull with inquirer-test', function () {
  it('takes a prompt and returns the relivant outcome', async function() {
    const indexPath = __dirname + '/index.js';
    console.log(run.toString());
    const result = await (indexPath, [inquirer_test.DOWN, inquirer_test.ENTER]);
    assert(index.pull().result.equal('cancel'));
  });
});
