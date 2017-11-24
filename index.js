var childProcess = require('child_process');
var inquirer = require('inquirer');
const chalk = require('chalk');

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
  console.log(chalk.green(gitResponse));
  return gitResponse;
}

function pull () {
  console.log("Helpful message about how git pull works");
  inquirer.prompt({
    type: 'list',
    name: 'pull_choices',
    message: 'Are you sure this is what you want to do?',
    choices: ['git pull', 'cancel action']
    }
  ).then((answers)=>{
    if(answers.pull_choices === "git pull") {
    var gitResponse = executeGitCommand();
    console.log(gitResponse);
    return gitResponse;
  } else {
    console.log("cancel");
    process.exit();
    }
  });
}

function executeGitCommand () {
  var gitCommand = childProcess.spawnSync('git', getGitHeadArgs());
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
  return gitResponse;
}

module.exports = {
  init : init,
  pull : pull
};
