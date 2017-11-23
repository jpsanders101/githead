var childProcess = require('child_process');
var commands = ["init", "add"];

console.log("You launched githead!");

var wrapper = {
  getGitHeadArgs: function () {
    return process.argv.slice(2, process.argv.length);
    }
}

function runEverything() {
  if (wrapper.getGitHeadArgs().length) {
    if (!commands.includes(wrapper.getGitHeadArgs()[0])) {
      console.log("This is not a command you can run with githead");
    }
    eval(wrapper.getGitHeadArgs()[0])();
    // console.log(eval(getGitHeadArgs()[0])());
  } else {
    console.log("You didn't tell githead to do anything!");
  }
}

// function getGitHeadArgs () {
//   return process.argv.slice(2, process.argv.length);
// }

function init () {
  console.log("Helpful message about how git works");
  var gitResponse = executeGitCommand();
  console.log(gitResponse);
  return gitResponse;
}

function add() {
  console.log("This explains how git add works");
  var gitResponse = executeGitCommand();
  console.log(gitResponse);
  return gitResponse;
}

function executeGitCommand () {
  var gitCommand = childProcess.spawnSync('git', wrapper.getGitHeadArgs());
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  return gitResponse;
}

function unknownCommand() {
  console.log("This is not a command you can run with githead");
}

module.exports = {
  init : init,
  add : add,
  runEverything : runEverything,
  wrapper: wrapper
};

runEverything();
