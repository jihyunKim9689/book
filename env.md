#Packages
##express-boom
Error response를 관리해주는 미들웨어
[boom docs](http://blog.devquest.co.kr/imp/1168)
##express-validator
request시 params를 validate하는 미들웨어
[express-validator docs](https://github.com/ctavan/express-validator)
##jasmine-node
서버 테스트
packages.json에 추가하여 사용($npm test로 테스트 실행)
```json
  "scripts": {
    "start": "node ./bin/www",
    "test": "jasmine-node ./spec/*"
  }
```
[jasmine-node docs](https://github.com/mhevery/jasmine-node)
##nodemon
nodemon은 프로젝트 폴더의 파일들을 모니터링하고 있다가 파일이 수정될 경우 자동으로 서버를 리스타트
[nodemon 사용방법](https://blog.outsider.ne.kr/649)
[nodemon docs](https://www.npmjs.com/package/nodemon)
> "Port 3000 is already in use" 문제 발생 시
> $ lsof -i tcp:3000
> $ kill -9 PID
##swagger-node

#Tool
##robomongo
mongoDB visualize 하는 tool
[다운로드](https://robomongo.org)
##mongodb compass
