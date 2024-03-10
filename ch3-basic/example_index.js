const { odd, even } = require("./var");
const checkOddEven = require("./func"); // 변수명은 마음대로 지을 수 있다. export default를 마음대로 가져올 수 있는 것과 동일한 로직

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = {
  checkStringOddOrEven,
};

console.log(checkStringOddOrEven("hello"));
console.log(checkOddEven(10));
