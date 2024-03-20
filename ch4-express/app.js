const express = require("express");
const path = require("path");
// path모듈은 계속 쓰인다.

const app = express();

// express는 if문으로 도배하지 않아도 된다.

// 서버에다가 변수를 심는다? 속성을 심는다고 보면 된다.
// 전역 변수같은 느낌으로 사용 가능하다.
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  // express는 fs모듈을 불러오지 않아도 senFile메소드로 파일을 보낼 수 있다.
  // (물론 sendFile 구현 소스를 보면 fs모듈이 있겠지)
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

// app.get으로 전역 변수화
app.listen(app.get("port"), () => {
  // app.get()으로 프로퍼티 심어둔걸 소환할 수 있다.
  console.log("익스프레스 서버 실행");
});

// 터미널에서 SET PORT=80 이런 식으로도 설정할수 있는데 이러면 나중에 바뀐지도 잘 모르고 수정도 어렵다.
// 언제나 명심할게 프레임워크, 언어보다 http, 네트워크 등이 더 중요하다.
// ls cookie-parser 등을 치면 cookie-parser가 있는지 알 수 있다. npm ls ...


// 3. 미들웨어란?
// 모든 요청에 반복적으로 쓰고 싶은 코드가 있다.