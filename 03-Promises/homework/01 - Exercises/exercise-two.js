"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // promise version
  // Tu código acá:
  exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
  .then( stanza=>exerciseUtils.blue(stanza))
  exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  .then(stanza=>exerciseUtils.blue(stanza))
}

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // promise version
  // Tu código acá:
  filenames.forEach(file=>
    exerciseUtils.promisifiedReadFile(file)
    .then(stanza=>exerciseUtils.blue(stanza))
    .catch(err=>exerciseUtils.magenta(new Error(err)))
    )
//promise all ----------
// let promises = filenames.map(file=> exerciseUtils.promisifiedReadFile(file))
// Promise.all(promises)
// .then(stanza=>exerciseUtils.blue(stanza))
// .catch(err=>exerciseUtils.magenta(new Error(err)))
}

function problemC() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
    return new Promise((resolve, reject) => {
      fs.writeFile(filename,str, "utf8", function(err){
        if(err)return reject(err)
        resolve()
      })
    })
  }
}