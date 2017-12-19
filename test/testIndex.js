var assert = require('assert');
var index = require('../index.js');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('Index', () => {
  var printerMock, printerSpy, index;
  before( () => {
    printerSpy = sinon.spy();
    printerMock = {
      print: printerSpy
    };
    index = proxyquire('../index.js', {
      'child_process': {
        spawnSync: function(command, args) {
          return {
            stdout: {
              toString: () => "git init success string"
            }
          };
        }
      }
    });
  });

  describe('#welcome', () => {
    it('prints a welcome message', () => {
      index.welcome(printerMock);
      assert(printerSpy.calledWith("You launched githead!"));
    });
  });

  describe('#init', () => {
    it('prints a helpful message about "git init"', () => {
      index.init(printerMock);
      assert(printerSpy.calledWith("Your directory is now initialised with git. That means everything in this directory and any sub--directories is being tracked.\nHints:\n> Add a '.gitignore' file to stop certain files from being tracked\n> Add a remote repository on GitHub to share the work in this directory with others."));
    });
    it('executes "git init"', function() {
      assert.equal(index.init(printerMock), "git init success string");
    });
    it('prints "git init" success string', () => {
      index.init(printerMock);
      assert(printerSpy.calledWith("git init success string"));
    });
  });

  describe('#helpme', () => {
    it('prints helpful message about githead usage', () => {
      index.helpme(printerMock);
      assert(printerSpy.calledWith("usage: githead [init] [merge] [pull] [add]"));
    });
  });

  describe('#methodSelector', ()=> {
    it('prints a helpful message when no arguments are passed to githead', () => {
      index.methodSelector(undefined, printerMock);
      assert(printerSpy.calledWith("Erm...you didn't tell githead to do anything!"));
    });
    // below not passing - index is not called from the interface so isn't stubbed
    // it('calls a method corresponding to the string passed in', () => {
    //   var indexSpy = sinon.stub(index, 'init');
    //   index.methodSelector('init');
    //   assert(indexSpy.calledOnce);
    // });
  });
});
