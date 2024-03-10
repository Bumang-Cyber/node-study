console.log(this, "(1)"); // {}
console.log(this === module.exports); // 전역에서의 this는 module.exports이다. 기본적으로 module.exports는 빈 객체이다.

function a() {
  // function 안의 this는 global이다.
  console.log(this, "(2)"); // Object [global] { ... }
}
a();

// 이것 외에는 브라우저 환경의 this와 모두 동일하다.
// 함수 안 마다 this가 새로 생기고,
// 화살표 함수는 부모의 this를 물려 받음.

// 그러므로 아래와 같이 export도 가능하다. 그러나 거의 쓰이지 않는다.
this.a = a;
