// url
// 인터넷 주소를 쉽게 조작하도록 도와주는 모듈입니다. url 처리에는 크게 두 가지 방식이 있습니다.
// 하나는 노드 버전 7에서 추가된 WHATRWF(웹 표준을 정하는 단체의 이름) 방식의 url이고,
// 다른 하나는 예전부터 노드에서 사용하던 방식의 url입니다. 요즘은 WHATWG 방식만 사용합니다.
// 브라우저에서도 WHATWG 방식을 사용하므로 호환성이 좋습니다.

// const url = require("url"); // 노드 내장객체여서 require 안 해도 쓸 수 있다.
// const { URL } = url;

const myURL = new URL("http://www.gilbut.co.kr/book/bookList.aspx?sercate=001001000#anchor");
console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));

// new URL(): URL {
//   href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate=001001000#anchor',
//   origin: 'http://www.gilbut.co.kr',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'www.gilbut.co.kr',
//   hostname: 'www.gilbut.co.kr',
//   port: '',
//   pathname: '/book/bookList.aspx',
//   search: '?sercate=001001000',
//   searchParams: URLSearchParams { 'sercate' => '001001000' },
//   hash: '#anchor'
// }
