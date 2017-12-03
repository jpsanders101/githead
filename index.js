var childProcess = require('child_process');
var inquirer = require('inquirer');

console.log("You launched githead!");

if (getGitHeadArgs().length) {
  methodSelector(getGitHeadArgs()[0]);
  // eval(getGitHeadArgs()[0])();
} else {
  console.log("You didn't tell githead to do anything!");
}

function methodSelector(githeadArg) {
  var selection = {
    "init": init,
    "pull": pull,
    "status": status,
    default: function () {
      console.log("Erm..you didn't tell githead to do anything!")
    }
  };
  return (selection[githeadArg] || selection['default'])();
}

function getGitHeadArgs () {
  return process.argv.slice(2, process.argv.length);
}

function init () {
  console.log("Helpful message about how git works");
  exports.wrapper.executeGitCommand(getGitHeadArgs());
}

function status () {
  console.log("Launching git status...");
  executeGitCommand(getGitHeadArgs());
}

function pull () {
  console.log("Helpful message about how git pull works");

  var promptPromise = exports.inquirer.prompt({
      type: 'list',
      name: 'pull_choices',
      message: 'Are you sure this is what you want to do?',
      choices: ['git pull', 'cancel action']
      }
    );

  var promptResponse = function (answers) {
    if(answers.pull_choices === "git pull") {
      exports.executeGitCommand(getGitHeadArgs());
    } else {
      process.exit();
    }
  };

  promptPromise.then(promptResponse);
}

var wrapper = {
  executeGitCommand: function(gitHeadArgs) {
    var gitCommand = childProcess.spawnSync('git', gitHeadArgs);
    var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
    console.log(gitResponse);
  }
}

function executeGitCommand (gitHeadArgs) {
  var gitCommand = childProcess.spawnSync('git', gitHeadArgs);
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  console.log(gitResponse);
}

var exports = module.exports = {
  init : init,
  pull : pull,
  inquirer: inquirer,
  wrapper: wrapper,
  executeGitCommand: executeGitCommand
};
