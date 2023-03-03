const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");


function pwd(print, args) {
  print(process.cwd());
}

function date(print, args) {
  print(Date());
}

function echo(print, args) {
  print(args.join(" "));
}

function ls(print, args) {
  fs.readdir(".", "utf-8", (error, files) => {
   if(error) throw Error(error)
   print(files.join('\n'))
  });
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data)=>{
        if(error) throw Error(error)
        print(data)
    })
}

function head(print, args) {
    fs.readFile(args, 'utf-8',(error, data)=>{
     if(error) throw Error(error)
     print(data.split('\n').at(0))
    })
}

function tail(print, args) {
    fs.readFile(args, 'utf-8',(error, data)=>{
        if(error) throw Error(error)
        print(data.split('\n').at(-1))
       })
}

function curl(print, args) {
    utils.request(args.join(''), (error,response)=>{
        if(error) throw Error(error)
        print(response)
    })
}

module.exports = { pwd, date, echo, ls, cat, head, tail, curl };
