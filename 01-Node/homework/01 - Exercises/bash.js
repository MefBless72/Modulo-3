const process = require("process");
const commands = require("./commands/index.js");
// stdout = imprime o muestra algo en pantalla, sirve para sacar datos.
// stdin = es como un addeventelistener, sirve para ingresar datos
const print = (output) => {
  process.stdout.write(output);
  process.stdout.write("\nprompt >");
};
function bash() {
  process.stdout.write("\nprompt >");
  process.stdin.on("data", (data) => {
    let args = data.toString().trim().split(" ");
    let cmd = args[0]; // o args.shift()
    commands[cmd]
      ? commands[cmd](print, args)
      : print(`command not found: ${cmd}`);
  });
}

bash();
module.exports = {
  print,
  bash,
};
