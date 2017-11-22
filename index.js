var childProcess = require('child_process');

console.log("You launched githead!");

if (getGitHeadArgs().length) {
  eval(getGitHeadArgs()[0])();
} else {
  console.log("You didn't tell githead to do anything!");
}

function getGitHeadArgs () {
  return process.argv.slice(2, process.argv.length);
}

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
}

function executeGitCommand () {
  var gitCommand = childProcess.spawnSync('git', getGitHeadArgs());
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  return gitResponse;
}

module.exports = {
  init : init,
  add : add
};
