var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

sinon.stub(console, "log");
var index = require('../index.js');
console.log.restore();

describe('.init', function () {
  it('returns a helpful message about "git init" to the command line', function () {
    var consoleSpy = sinon.stub(console, "log");
    index.init();
    assert(consoleSpy.calledWith("Helpful message about how git works"));
    console.log.restore();
  });



  it('executes "git init"', function () {
    var consoleSpy = sinon.stub(console, "log");
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
    index.init();
    // assert(executeSpy.calledOnce);
    assert(consoleSpy.calledWith("git init success string"));
    console.log.restore();
    // sinon.assert.match(index.init(), "git init success string");
  })

});


// describe('.pull', function () {
//
//   it('returns a helpful message about "git pull" to the command line', function () {
//     var consoleSpy = sinon.spy(console, "log");
//     index.pull();
//     assert(consoleSpy.calledWith("Helpful message about how git pull works"));
//     console.log.restore();
//   });
//
//   it('asks a question', function () {
//     var inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'test answer'}));
//     index.pull();
//     assert(inquirerStub.calledOnce);
//   });
//
//   it('when user selects "git pull", the command is executed', function () {
//     var executerStub = sinon.stub(index, "executeGitCommand").returns("git command stdout string");
//     var inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));
//
//     assert(index.pull() === "git command stdout string", "worked!");
//   });
//   it('when user selects "cancel action", the program exits', function () {
//
//   });
// });
