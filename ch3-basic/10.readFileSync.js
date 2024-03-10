const fs = require("fs");

let sync1 = fs.readFileSync("./writeMe.txt"); // readFileSync는 또 콜백을 받는게 아니네
console.log(sync1.toString(), "동기 1번");

let sync2 = fs.readFileSync("./writeMe.txt");
console.log(sync2.toString(), "동기 2번");

let sync3 = fs.readFileSync("./writeMe.txt");
console.log(sync3.toString(), "동기 3번");
