const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8085");
      const name = url.searchParams.get("name");
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      const uniqueInt = Date.now(); // 겹치지 않게 만들어야한다.
      session[uniqueInt] = {
        name, // 중요한 정보 1
        expires, // 중요한 정보 2
      };
      // uniqueInt만 프론트로 갔다 오는 거지 실제 세션객체에 어떤 값이 있는지는 프론트 측에서 알 수 없음.
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
      // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면 (만료기간이 지났으면 프론트에서 보냈을리는 없겠지만, 철저하게 해서 나쁠건 없으니까.)
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8085, () => {
    console.log("8085번 포트에서 서버 대기 중입니다!");
  });
