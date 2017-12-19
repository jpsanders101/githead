# Githead
### _A helpful command line tool that stops you from losing your git._

![Help screen](https://i.imgur.com/d0NI72l.png)

![githead pull](https://i.imgur.com/vSYhUyG.png)

Our first experiences working on group software projects taught us that not having confidence with git is a major drawback. Establishing a good git workflow is essential and mistakes made can be very costly. We decided to build a command line tool that would help beginners through their teething issues by:
* Providing useful reminders about what certain git commands do
* Asking the user for confirmation before executing a git command

## Authors

* Lucas Salmins
* Christine Horrocks
* Alexis Carlier
* Jon Sanders

## Instructions
Githead can be installed directly from NPM:

```
$ npm install global githead-helper
```

Or by cloning from GitHub:
```
$ git clone git@github.com:jonsanders101/githead.git
$ cd githead
$ npm install -g
```

## Using Githead

Simply replace 'git' with 'githead' when executing normal git commands. For example:

```
$ githead init
```

Will return the following message:

```
Your directory is now initialised with git. That means everything in this directory and any sub--directories is being tracked.
Hints:

> Add a '.gitignore' file to stop certain files from being tracked
> Add a remote repository on GitHub to share the work in this directory with others.
```

## Project Review notes
This was a challenging group project we worked on over four days. It introduced us to using Node.js and approaches to building a command line tool.

More functionality is currently in other branches but is incomplete `pull2` contains an implementation of `#pull` using inquirer, for example.

### Printer Unit
Due to the dependency on the console object, our original test suite was highly fragile. I have wrapped `console.log` within a separate unit called `printer` and injected the dependency into index to make it easier to test. This will also make extending the functionality of the `printer` unit easier in the future to e.g. make it print different colours to the console.

### Executing Git commands
We arrived at a solution for wrapping around git functions by using child processes. Arguments passed to the `$ githead` command are then passed to a synchronous child process within the program which executes the git command. This solution means that any flags that would be passed to a git command can also be handled by githead.

### Testing Strategy
Our strategy for testing was to use unit tests to test all code paths, but to stub the console and the 'inquirer' framework, then use a feature testing to ensure inquirer behaves as expected. Key difficulties on this project were around effective testing. The frequent stubbing and restoring of the console object made the tests very brittle; when one test failed, the error message for that test, as well as the result for any subsequent test, was not shown because the console is only restored after each test passes. 'inquirer' also proved very difficult to test. As such, this project is a work-in-progress, with incomplete features on several branches to allow us (and any willing pull-requesters!) to continue working on it.


## Currently Available Commands
* git helpme (provides githead usage instructions)
* git init
* git pull

## Technologies Used
* Node.js
* Inquirer - command line framework for asking the user questions
* Chalk - command line framework for adding colour to commmand line output

### Testing
* Mocha
* Sinon
* Proxyquire
* Inquirer-test

## ASCII art
Credit for two pieces of ASCII art for our logo is due to:

* [!!!!!Krogg98](http://ascii.co.uk/art/shit)
* [Wny](http://www.chris.com/ascii/index.php?art=people/faces)
