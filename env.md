# Packages

## 1.개발관련
### 개발순서
docs 작업 -> 개발 -> test
### mongoose
MongoDB ODM package
[mongoose docs](http://mongoosejs.com)
[시작하기](https://velopert.com/594)
### express-boom
Error response를 관리해주는 미들웨어
[boom docs](https://www.npmjs.com/package/express-boom)
### express-validator
request시 params를 validate하는 미들웨어
[express-validator docs](https://github.com/ctavan/express-validator)
### nodemon
nodemon은 프로젝트 폴더의 파일들을 모니터링하고 있다가 파일이 수정될 경우 자동으로 서버를 리스타트
[nodemon 사용방법](https://blog.outsider.ne.kr/649)
[nodemon docs](https://www.npmjs.com/package/nodemon)
> "Port 3000 is already in use" 문제 발생 시
> $ lsof -i tcp:3000
> $ kill -9 PID

## 2.docs관련

### swagger
[swagger-jsdoc 연동하기](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WbEtOq068kF)
[swagger-ui 설정](https://github.com/swagger-api/swagger-ui)
[swagger request CORS 문제](http://guswnsxodlf.github.io/enable-CORS-on-express)

## 3.test관련
### 테스트
- 테스트 프레임워크로는 mocha 를 사용 
- Assertion 라이브러리는 chai 를 사용 
- supertest를 통해서 리퀘스트
[node tdd](http://seokjun.kr/node-js-tdd/)
#### supertest
Supertest is a library made specifically for testing nodejs http servers
[supertest docs](https://www.npmjs.com/package/supertest)
#### mocha(나중에는 tape로 대체 예정)
Mocha is a feature-rich JavaScript test framework running on Node.js
[mocha docs](https://www.npmjs.com/package/mocha)
#### chai
Chai is a BDD / TDD assertion library for node and the browser 
[chai docs](https://www.npmjs.com/package/chai)
#### nyc mocha
Mocha 테스트를 정리하여 보여주는 역할

>#### jasmine-node
>서버 테스트
>packages.json에 추가하여 사용($npm test로 테스트 실행)
>```json
>  "scripts": {
>    "start": "node ./bin/www",
>    "test": "jasmine-node ./spec/*"
>  }
>```
>[jasmine-node docs](https://github.com/mhevery/jasmine-node)

# Tool
### robomongo
mongoDB visualize 하는 tool
[다운로드](https://robomongo.org)
### mongodb compass
### git-flow(brew에 설치 사용)
git-flow 방식을 명령어로 사용(git-flow 설명 : docs/정리/4.2)

