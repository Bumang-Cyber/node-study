const express = require("express");
const path = require("path");
// path모듈은 계속 쓰인다.

const app = express();
// 3. 미들웨어란?
// 모든 요청에 반복적으로 쓰고 싶은 코드가 있다면 요청마다 일일이 적지 않고 use를 쓰자.

// 이런거 하나하나를 라우터라고 부른다고 한다.
app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  // url없이 사용하면 모든 요청에 사용.
  console.log("모든 요청에 실행하고 싶어요.");
  next(); // next함수를 호출해야 다음 스크립트를 읽기 시작한다. 안 하면 그냥 여기서 요청을 종료하는 듯.
});

app.get("/", (req, res) => {
  // express의 req,res도 기본적으로 http메소드의 req, res를 상속받은 객체여서 http메소드들을 거의 다 쓸 수 있다. 그러나 express문법으로만 쓰자.
  // 이런 콜백함수들을 미들웨어라고 한다.
  res.sendFile(path.join(__dirname, "index.html"));
  res.send("하하");
  res.json({ key: "value" });
  // send, sendFile한 다음에도 스크립트는 계속 진행된다.
  // send하는 스크립트는 한 미들웨어에서 여러번 쓸 수 없다.
  // 요청 한 번에 응답 한 개만 보낼 수 있다.
  // 응답을 보낸 다음에 writeHead를 해도 에러가 뜬다.

  // 만약 if믄으로 나눈다면? 가능할듯

  // res.json은 응답을 보낼 뿐이지 함수를 종료하는 것은 아니다.
});

// 보통 에러를 처리할 때 다음 미들웨어에 try/catch문으로 많이 처리하고,
// catch (error) {
//   next(error) // 이벓게 많이 처리한다.
// next()에 아무런 인자를 넣지 않으면 그냥 다음 라우터를 찾으라는 의미가 되는데 next(error)처럼 인자를 넣으면 바로 에러처리 미들웨어로 간다.
// }

app.use("/about", (req, res, next) => {
  // url없이 사용하면 모든 요청에 사용.
  console.log("어바웃 이하의 url에는 다 실행하고 싶어요.");
  next(); // next함수를 호출해야 다음 스크립트를 읽기 시작한다. 안 하면 그냥 여기서 요청을 종료하는 듯.
});

app.get("/category/:name", (req, res) => {
  // 패러미터, 와일드카드 라는 이름으로 쓸 수 있다.
  res.send(`hello ${req.params.name}`);
});

app.get(
  // 미들웨어를 동시에 여러개 보낼수도 있다!
  "/about",
  (req, res, next) => {
    console.log("1");
    next();
    // 만약 next("route")를 하면 이 미들웨어의 다음 미들웨어가 아니라 다음 일치하는 라우터를 찾게 된다.
  },
  (req, res, next) => {
    console.log("2");
    next();
  },
  (req, res, next) => {
    res.send("about express3"); // send를 하면 자동으로 리턴되기 때문에
    next();
  },
  (req, res, next) => {
    // 4가 실행되는 일은 없다.
    res.send("about express4");
    next();
  }
);

// 마지막엔 에러 미들웨어.
// 에러 미들웨어는 next까지 4개 다 써야한다.
// next가 없다면 에러 미들웨어라고 할 수 없을 것이다.

// res객체는 기본적으로 200이 생략되어 있다.
// res.status(200).send(...)
// res.status(404).send(...)로 바꾸면 404에러를 클라이언트로 보낸다.
// 보안 상 의미적으로 구별 안 하고 뭔 에러든 다 404로 때리는 사람도 많다.
app.use((err, req, res, next) => {
  console.log(err, "에러가 발생했습니다.");
});

// 위 에러 미들웨어가 있으니 이건 실행되지 않음.
app.get("*", (req, res) => {
  // 위의 라우트가 아닌 요청의 url이면 404체이지
  res.send("에러가 발생했습니다.");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
