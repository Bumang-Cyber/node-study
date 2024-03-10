const { odd, even } = require("./var"); // require는 노드에서 알아서 제공해준다.
// const value = require("./var"); // require는 노드에서 알아서 제공해준다.

function checkOddEven(number) {
  if (number % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddEven;

// module.exports = {
//   // export default의 CommonJS버전
//   checkOddEven,
//   // odd, // 이미 임포트 해온 것도 넘겨줄 수 있다. 그러나 이러면 헷갈려서 안 좋지..
//   // even
// };
