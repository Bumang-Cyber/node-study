const fs = require("fs");

const buffer = Buffer.from("저를 버퍼로 바꿔보세요.");
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const arr = [Buffer.from("띄엄 "), Buffer.from("띄엄 "), Buffer.from("띄어쓰기")];
const res = Buffer.concat(arr).toString(); // Buffer의 정적 메소드
console.log(res);

console.log(Buffer.alloc(5)); // 00 00 00 00 00, 아무 의미없이 버퍼를 만들기도 한다고 한다. 어따 사용하지?

let streamArr = [];
// const readStream = fs.createReadStream("./stream.txt"); // 얘는 기준을 주지 않으면 64kb 반위로 버퍼를 만든다.
const readStream = fs.createReadStream("./stream.txt", { highWaterMark: 16 }); // 의존성 객체?를 통해 16bytes 단위로 설정
readStream.on("data", (chunk) => {
  streamArr.push(chunk);
  console.log(chunk, chunk.length, "data chunk");
});

readStream.on("end", () => {
  console.log("end: ", Buffer.concat(streamArr).toString()); // 그런데 164 byte 밖에 안 돼서 한 번에 다 읽어버림..
});

readStream.on("error", (error) => {
  console.log("error: ", error);
});
