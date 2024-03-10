const os = require("os");
console.log(os.cpus()); // cpu 정보 (코어갯수)
// 노드는 기본적으로 싱글 스레드니까 5개 놀고 있을 수 있다.
// 환경마다 다르니까 정확히 코어가 몇 개인지 알아내서 추가적으로 스레드를 추가할 수 있나보다.
// node의 스레드와 os의 스레드는 다름.

os.freemem(); // 현재 사용가능한 메모리
os.totalmem(); // 전체 메모리 용량
os.hostname(); // 컴퓨터의 이름
os.type(); // 운영체제의 종류를 보여줍니다.
os.uptime(); // 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다.
os.release(); // 운영체제의 버전
