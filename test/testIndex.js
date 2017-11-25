var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

sinon.stub(console, "log");
var index = require('../index.js');
console.log.restore();

var consoleSpy, executeSpy;

// describe('.init', function () {
//
//   it('returns a helpful message about "git init" to the command line', function () {
//     consoleSpy = sinon.stub(console, "log");
//     executeSpy = sinon.stub(index.wrapper, "executeGitCommand");
//     index.init();
//     assert(consoleSpy.calledWith("Helpful message about how git works"));
//     consoleSpy.restore();
//     executeSpy.restore();
//   });
//
//   it('executes "git init"', function () {
//     consoleSpy = sinon.stub(console, "log");
//     executeSpy = sinon.stub(index.wrapper, "executeGitCommand");
//     index.init();
//     assert(executeSpy.calledOnce);
//     consoleSpy.restore();
//     executeSpy.restore();
//   });
//
// });
//
// describe('.executeGitCommand', function() {
//   it('logs response to git command to the console', function () {
//     consoleSpy = sinon.stub(console, "log");
//     var index = proxyquire('../index.js', {
//       'child_process': {
//         spawnSync: function () {
//                       return {
//                         stdout: {
//                           toString: () => "git status success string"
//                         }
//                       };
//                     }
//       }
//     });
//     index.wrapper.executeGitCommand();
//     assert(consoleSpy.calledWith("git status success string"));
//     consoleSpy.restore();
//   });
//   it('executes git command with arguments', function () {
//     consoleSpy = sinon.stub(console, "log");
//     index.wrapper.executeGitCommand(["status", "-s"]);
//     assert(consoleSpy.calledOnce);
//     console.log.restore();
//   });
//   it('logs error message for invalid git commands', function () {
//     consoleSpy = sinon.stub(console, "log");
//     index.wrapper.executeGitCommand(["status", "invalidcommand"]);
//     assert(consoleSpy.calledOnce);
//     console.log.restore();
//   });
// });


describe('.pull', function () {
  var inquirerStub;
  it('returns a helpful message about "git pull" to the command line', function () {
    executeSpy = sinon.stub(index, "executeGitCommand");
    inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));
    consoleSpy = sinon.spy(console, "log");
    index.pull();
    assert(consoleSpy.calledWith("Helpful message about how git pull works"));
    inquirerStub.restore();
    executeSpy.restore();
    consoleSpy.restore();
  });
  it('asks a question', function () {
    var executerStub = sinon.stub(index.wrapper, "executeGitCommand").returns("git command stdout string");
    var inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));
    var consoleSpy = sinon.spy(console, "log");
    index.pull();
    assert(inquirerStub.calledOnce);
    index.inquirer.prompt.restore();
    index.wrapper.executeGitCommand.restore();
    console.log.restore();
  });
  it('when user selects "git pull", the command is executed', function () {
    sinon.stub(console, "log");
    var executerStub = sinon.stub(index.wrapper, "executeGitCommand");
    var inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));
    index.pull();
    assert(executerStub.calledOnce);
    index.inquirer.prompt.restore();
    index.wrapper.executeGitCommand.restore();
    console.log.restore();
  });
  it('when user selects "cancel action", the program exits', function () {
    var exitSpy = sinon.stub(process, "exit");
    index.pull();
    assert(exitSpy.calledOnce);
  });
});
