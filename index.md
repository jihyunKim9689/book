# 게시판 서버 개발
2주 안에 간단한 application 개발
## 개발 범위
    - 게시판
        - 나라별 언어 지원
        - 공지사항과 알림의 category로 구분
## skill set
    - node.js
        - express, mongoose, boom, swagger
    - mongoDB
    - Angular1, HTML / CSS
        - angular-bootstrap, editor library
    - git, github
## 기능별 설명
    1. 게시판
        - 게시글 5개를 한 페이지로하며, pagination이 가능하도록 개발
        - admin 계정만 게시글 update 및 delete 가능, user 계정은 read만 가능
> 기능별 branch를 만들고 request method CRUD를 구별
> (create - post, read - get, update - put, delete - delete)
> 기능별로 개발이 끝나면 push하여 github에 저장

### 데이터 schema
Board Schema
```json
{
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
    title:{
        type:String,
        required: true
    },
    contents:{
        type:String,
        required: true
    },
    createdAt:Date,
    updatedAt:Date
}
```
category schema
```json
{
    //1:영어 2: 한국어
    type:{
        type:Number,
        required:true,
        default: 1
    }
}
```
### 게시판 리스트
```javascript
//https://~~~/board?page=1&limit=5
get('/board',(req, res) => {
    let page = res.query.page;
    let limit = res.query.limit;
    
    //dao에 접근하여 board list 받아오기
    //pagination하여 데이터를 받아온다.
});
```

### 게시판 정보 받아오기
```javascript
//https://~~~/board/3?lang=1
get('/board/:board_id', (req,res) => {
    let lang = res.query.lang;
    if(lang === undefined){
        lang = 1;
    }

    selectLang(lang);
});

let selectLang = function(lang){
    let arrayLang = dao.getArrayLang();
    for(arrayLang.type === lang){
        //언어를 선택하고 response
    }
}
```
### 게시판 정보 response 객체
```json
{   
    //공지사항의 경우
    category:1,
    lang:{
        type:1
        title:"hi"
        contents:"hi ~~~~~~~"
    },
    createdAt:"2017_09_03",
    updatedAt:"2017_09_03"
}

{   
    //detail의 경우
    category:2,
    lang:{
        type:1
        title:"hi"
        contents:"hi ~~~~~~~"
    },
    detailObject:{
        
    },
    createdAt:"2017_09_03",
    updatedAt:"2017_09_03"
}
```