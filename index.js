var childProcess = require('child_process');
var inquirer = require('inquirer');

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

function pull () {
  console.log("Helpful message about how git pull works");

  var promptPromise = inquirer.prompt({
      type: 'list',
      name: 'pull_choices',
      message: 'Are you sure this is what you want to do?',
      choices: ['git pull', 'cancel action']
      }
    );

  var promptResponse = function (answers) {
    if(answers.pull_choices === "git pull") {
      var gitResponse = executeGitCommand();
      console.log(gitResponse);
      return gitResponse;
    } else {
      console.log(answers)
      console.log(promptPromise);
      process.exit();
    }
  }

  promptPromise.then(promptResponse);
}

function executeGitCommand () {
  // var gitCommand = childProcess.spawnSync('git', getGitHeadArgs());
  // var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  // return gitResponse;
  return "Uncomment above when your sure stub works";
}

module.exports = {
  init : init,
  pull : pull,
  inquirer: inquirer,
  executeGitCommand: executeGitCommand
};
