const path = require("path");

// 경로처리를 os마다 안 해줘도 되게 해줌

path.join(__dirname, "..", "var.js");
// 현재 dirname + var.js

path.resolve(__dirname, "..", "/var.js");
// 절대경로
