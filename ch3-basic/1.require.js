require("./var");
// 이렇게 하면 해당 파일의 변수를 가져와서 참조하지는 못한다. 그러나 실행만은 할 수 있다.
// 실행을 할 수 있다는게 해당 파일에 있는 함수 실행들이 이 파일에서도 실행된다는건가?
console.log(require);

// require도 모듈이다.
// [Function: require] {
//   resolve: [Function: resolve] { paths: [Function: paths] },
//   main: {
//     id: '.',
//     path: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node',
//     exports: {},
//     filename: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/require.js',
//     loaded: false,
//     children: [ [Object] ],
//     paths: [
//       '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/node_modules',
//       '/Users/jeongbeomhwan/Desktop/node-study/node_modules',
//       '/Users/jeongbeomhwan/Desktop/node_modules',
//       '/Users/jeongbeomhwan/node_modules',
//       '/Users/node_modules',
//       '/node_modules'
//     ]
//   },
//   extensions: [Object: null prototype] {
//     '.js': [Function (anonymous)],
//     '.json': [Function (anonymous)],
//     '.node': [Function (anonymous)]
//   },
//   cache: [Object: null prototype] {
//     '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/require.js': {
//       id: '.',
//       path: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node',
//       exports: {},
//       filename: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/require.js',
//       loaded: false,
//       children: [Array],
//       paths: [Array]
//     },
//     '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/var.js': {
//       id: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/var.js',
//       path: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node',
//       exports: {},
//       filename: '/Users/jeongbeomhwan/Desktop/node-study/zerocho-node/var.js',
//       loaded: true,
//       children: [],
//       paths: [Array]
//     }
//   }
// }

// require.main은 module과 같다. 노드 실행 시 첫 모듈을 가리킨다고 한다.
//  즉, require.main을 사용하면 어떤 파일이 스크립트의 진입점인지, 즉 프로그램의 시작점인지 알 수 있습니다.
// require.main은 현재 실행되는 모듈을 뜻합니다. 즉, require.main을 사용하면 어떤 파일이 현재 실행되고 있는지, 즉 스크립트의 진입점이 어디인지 알 수 있습니다.
// require로 불러온 거는 cache된다. cache: { ... }에 보면 있는걸 볼 수 있다.

// import는 가장 위에 있어야 하지만
// require는 어디서 가져오든 상관없다.
