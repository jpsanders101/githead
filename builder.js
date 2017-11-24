function build(path, fuName) {
  fs.readSync(path).toString() + fnName + "()";
}

fs.writeFileSync(build("./pull.js", "pull"), "pull-test.js");
