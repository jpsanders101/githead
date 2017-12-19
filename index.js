var childProcess = require('child_process');
var printer = require('./printer');

function welcome (printerUnit = printer) {
  printerUnit.print("You launched githead!");
}
welcome();

methodSelector(getGitHeadArgs()[0]);

function methodSelector(githeadArg) {
  var selection = {
    "init": init,
    "pull": pull,
    default: function () {
      console.log("Erm..you didn't tell githead to do anything!");
    }
  };
  return (selection[githeadArg] || selection['default'])();
}

function init(printerUnit = printer) {
  printerUnit.print("Your directory is now initialised with git. That means everything in this directory and any sub--directories is being tracked.\nHints:\n> Add a '.gitignore' file to stop certain files from being tracked\n> Add a remote repository on GitHub to share the work in this directory with others.")
  // console.log("Your directory is now initialised with git. That means everything in this directory and any sub--directories is being tracked.\nHints:\n> Add a '.gitignore' file to stop certain files from being tracked\n> Add a remote repository on GitHub to share the work in this directory with others.");
  var gitResponse = executeGitCommand();
  // console.log(gitResponse);
  return gitResponse;
}

function pull() {
  console.log("You're about to pull a repo down from a remote repository and merge it with the one you're in currently");
  var gitResponse = executeGitCommand();
  console.log(gitResponse);
  return gitResponse;
}

function helpme() {
  console.log("usage: githead [init] [merge] [pull] [add]")
}

function getGitHeadArgs () {
  return process.argv.slice(2, process.argv.length);
}

function executeGitCommand() {
  var gitCommand = childProcess.spawnSync('git', getGitHeadArgs());
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  return gitResponse;
}

module.exports = {
  init: init,
  welcome: welcome
};
