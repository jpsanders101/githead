var assert = require('assert');
var index = require('../index.js');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('#welcome', () => {
    it('prints a welcome message', () => {
      var printerSpy = sinon.spy();
      var printerMock = {
        print: printerSpy
      };
      index.welcome(printerMock);
      assert(printerSpy.calledWith("You launched githead!"));
    });
  });

  describe('#init', () => {
    it('prints a helpful message about "git init"', () => {
      var printerSpy = sinon.spy();
      var printerMock = {
        print: printerSpy
      };
      index.init(printerMock);
      assert(printerSpy.calledWith("Your directory is now initialised with git. That means everything in this directory and any sub--directories is being tracked.\nHints:\n> Add a '.gitignore' file to stop certain files from being tracked\n> Add a remote repository on GitHub to share the work in this directory with others."));
    });
  });

// describe('.init', function() {
//   it('returns a helpful message about "git init" to the command line', function() {
//     var consoleSpy = sinon.spy(console, "log");
//     index.init();
//     assert(consoleSpy.calledWith("Helpful message about how git works"));
//     console.log.restore();
//   });
//
//   it('executes "git init"', function() {
//
//     var index = proxyquire('../index.js', {
//       'child_process': {
//         spawnSync: function(command, args) {
//           return {
//             stdout: {
//               toString: () => "git init success string"
//             }
//           };
//         }
//       }
//     });
//
//     sinon.assert.match(index.init(), "git init success string");
//   })
//   describe('.helpme', function() {
//     it('returns some helpful information', function() {
//       var consoleSpy = sinon.spy(console, "log");
//       index.helpme();
//       assert(consoleSpy.calledWith("usage: githead [init] [merge] [pull] [add]"))
//       console.log.restore();
//     })
//   })
// });
