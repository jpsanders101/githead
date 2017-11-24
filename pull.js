var childProcess = require('child_process');
var inquirer = require('inquirer');
const chalk = require('chalk');

function getGitHeadArgs () {
  return process.argv.slice(2, process.argv.length);
}

function executeGitCommand () {
  var gitCommand = childProcess.spawnSync('git', getGitHeadArgs());
  var gitResponse = gitCommand.stdout.toString() || gitCommand.stderr.toString();
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

module.exports = {
  pull : pull
};
