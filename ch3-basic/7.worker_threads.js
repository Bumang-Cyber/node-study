const { isMainThread } = require("worker_threads");

if (isMainThread) {
  //메인스레드
} else {
  // 워커스레드
}
