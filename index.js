// http 요청에 응답하는 노드 서버
// - createServer로 요청 이벤트에 대기
// - req 객체는 요청에 관한 정보가, res 객체는 응답에 관한 정보가 담겨 있음
// 도메인은 구입해야되는 것이다. localHost나 IP로 하고싶지 않다면 구입해야된다.

const http = require("http");
const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      const file = await fs.readFile("./server2.html");
      res.end(file);
    } catch (err) {
      console.log(err, "에러가 발생했습니다.");
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8080);

server.on("listening", () => {
  console.log("listening");
});

server.on("error", (error) => {
  console.error(error);
});
