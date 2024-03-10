process.version; // v14.0.0 // 설치된 노드의 버전
process.arch; // x64 // 프로세서 아키텍처 정보
process.platform; // win32 // 운영체제 플랫폼 정보
process.pid; // 현재 프로세스의 아이디
process.uptime; // 프로세스가 시작된 후 흐른 시간. 단위는 초. (이걸로 컴퓨터 자동 종료 타이머를 만들거나 시간 제한 앱을 만들 수 있을 듯)
process.execPath; // 노드의 경로
process.cwd(); // 노드가 실행되는 위치
process.cpuUsage(); // cpu 사용량

process.env; // 환경변수 (파일이 있어야함)

// NODE_OPTIONS = --max-old-space-size=8192; // 노드 실행 옵션 (메모리 할당량?)
// UV_THREADPOOL_SIZE = 8;// 스레드풀 개수
