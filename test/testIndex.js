var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

sinon.stub(console, "log");
var index = require('../index.js');
console.log.restore();

var consoleSpy, executeSpy;

describe('.init', function () {

  it('returns a helpful message about "git init" to the command line', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");
    executeSpy = sinon.stub(index.wrapper, "executeGitCommand");

    index.init();
    assert(consoleSpy.calledWith("Helpful message about how git works"));

    // teardown
    consoleSpy.restore();
    executeSpy.restore();
  });

  it('executes "git init"', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");
    executeSpy = sinon.stub(index.wrapper, "executeGitCommand");

    index.init();
    assert(executeSpy.calledOnce);

    // teardown
    consoleSpy.restore();
    executeSpy.restore();
  });

});

describe('.executeGitCommand', function() {
  it('logs response to git command to the console', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");
    var index = proxyquire('../index.js', {
      'child_process': {
        spawnSync: function () {
                      return {
                        stdout: {
                          toString: () => "git status success string"
                        }
                      };
                    }
      }
    });

    index.executeGitCommand();
    assert(consoleSpy.calledWith("git status success string"));

    // teardown
    consoleSpy.restore();
  });
  it('handles git command with arguments', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");

    index.executeGitCommand(["status", "-s"]);
    // actually executes 'git status -s' - should I test console output?
    assert(consoleSpy.calledOnce);

    // teardown
    console.log.restore();
  });
  it('logs error message for invalid git commands', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");
    index.executeGitCommand(["status", "invalidcommand"]);

    // teardown
    assert(consoleSpy.calledOnce);
    console.log.restore();
  });
});


describe('.pull', function () {
  var inquirerStub;

  it('returns a helpful message about "git pull" to the command line', function () {
    // setup
    // stubbing executeGitCommand from index works
    executeSpy = sinon.stub(index, "executeGitCommand");
    inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));
    consoleSpy = sinon.stub(console, "log");

    index.pull();
    assert(consoleSpy.calledWith("Helpful message about how git pull works"));

    // teardown
    inquirerStub.restore();
    executeSpy.restore();
    consoleSpy.restore();
  });

  it('asks a question', function () {
    // setup
    // consoleSpy & executerStubs not working
    consoleSpy = sinon.stub(console, "log");
    executerStub = sinon.stub(index, "executeGitCommand").returns("git command stdout string");
    inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));

    index.pull();
    assert(inquirerStub.calledOnce);

        // teardown
    index.inquirer.prompt.restore();
    index.executeGitCommand.restore();
    consoleSpy.restore();
  });

  it('when user selects "git pull", the command is executed', function () {
    // setup
    consoleSpy = sinon.stub(console, "log");
    var executerStub = sinon.stub(index.wrapper, "executeGitCommand");
    var inquirerStub = sinon.stub(index.inquirer, "prompt").returns(Promise.resolve({pull_choices: 'git pull'}));

    index.pull();
    assert(executerStub.calledOnce);

    // teardown
    index.inquirer.prompt.restore();
    index.wrapper.executeGitCommand.restore();
    console.log.restore();
  });
  it('when user selects "cancel action", the program exits', function () {
    // setup
    var exitSpy = sinon.stub(process, "exit");

    index.pull();
    assert(exitSpy.calledOnce);

    // teardown
    process.exit.restore();
  });
});
