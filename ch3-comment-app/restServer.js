const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {}; // 데이터 저장용
const comments = {}; // 코멘트 데이터 저장용

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile(path.join(__dirname, "restFront.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          return res.end(JSON.stringify(users));
        } else if (req.url === "/comment") {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(JSON.stringify(comments));
        }
        // /도 /about도 /users도 아니면
        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록 성공");
          });
        } else if (req.url === "/comment") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 코멘트 내용(Body):", body);
            const { comment } = JSON.parse(body);
            const id = Date.now();
            comments[id] = comment;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        } else if (req.url.startsWith("/comment/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 코멘트 내용(Body):", body);
            comments[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(comments));
          });
        } else if (req.url.startsWith("/rabbitify/user/")) {
          const spl = req.url.split("/");
          const key = spl[spl.length - 1];
          console.log(key, "key");
          users[key] = "🐇";
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        } else if (req.url.startsWith("/rabbitify/comment/")) {
          const spl = req.url.split("/");
          const key = spl[spl.length - 1];
          console.log(key, "key");
          comments[key] = "🐇";
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(comments));
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        } else if (req.url.startsWith("/delete-all/")) {
          for (let user in users) {
            delete users[user];
          }
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify({}));
        } else if (req.url.startsWith("/comment/")) {
          const key = req.url.split("/")[2];
          delete comments[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(comments));
        }
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다");
  });
