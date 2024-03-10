// 파일 시스템
const fs = require("fs");

fs.readFile("./readFile.txt", (err, data) => {
  // 에러 패러미터가 먼저 있는거 참 특이하네..
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});

// <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94> // 2진법을 16진법으로 바꾼 것.
// Buffer나 Binary는 컴퓨터가 이해하는 형태라고 보면 된다. toString()을 해줘야 실제 문자열로 볼 수 있다.
// 저를 읽어주세요

// Promise 문법으로 바꿀려면 앞서 살펴본 util.promisify로 콜백을 감싸주면 된다.
// 혹은 const fs = require("fs").promises 로 하면 된다. (하도 promise 지원해달란 말이 많아서 만들어줌)

// fs.writeFile("./writeMe.txt", "글이 입력됩니다.")
//   .then(() => {
//     return fs.readFile("./writeMe.txt");
//   })
//   .then((data) => {
//     console.log("Done!", data.toString());
//     return data.toString();
//   })
//   .catch((err) => {
//     console.log(err, "Err");
//   });

fs.readFile("./readFile.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString(), "비동기 1번");
});

fs.readFile("./readFile.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString(), "비동기 2번");
});

fs.readFile("./readFile.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString(), "비동기 3번");
});
