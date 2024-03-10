// stream 방식은 pipe방식이라고도 한다.
const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./stream.txt", { highWaterMark: 16 });
const zlibStream = zlib.createGzip(); // 압축 라이브러리
const writeStream = fs.createWriteStream("./writeMe4.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream); // 파이프끼리 연결할 수 있음.
