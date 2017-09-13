const path = process.cwd();
var request = require('supertest');
var mongooseConnection = require(path + '/bin/mongooseConnection');
const config = require(path + '/config');
var expect = require('chai').expect;
var app = require('../app');

describe("board test", function() {
    beforeEach(function (done) {
        if(!mongooseConnection.isConnected()){
            mongooseConnection.connect(done);
        }else{
            done();
        }
    });

    describe("/board", function() {
        it("GET returns status code 200", function(done) {
            request(app)
            .get('/boards')
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });
        
        it("GET returns status code 200", function(done) {
            request(app)
            .get('/boards')
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                }else{
                    done();
                }
            });
        });

        it("GET returns status code 200", function(done) {
            const boardId = '59b62ec81509551ea3f2639f';
            request(app)
            .get('/boards/'+boardId)
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                }else{
                    done();
                }
            });
        });

        // it("POST returns status code 201", function(done) {
        //     request(app)
        //     .post('/board')
        //     .expect(201)
        //     .send({
        //         category: '59b5f84714c80551279808e8',
        //         lang: 1,
        //         title: '2017년09월11일 공지',
        //         contents: '2017년09월11일 공지 ~~~'
        //     })
        //     .end((err, res) => {
        //         if(err){
        //             done(err);
        //         }else{
        //             done();
        //         }
        //     });
        // });

        it("POST returns status code 400", function(done) {
            request(app)
            .post('/boards')
            .expect(400)
            .send({
                category: '59b5f84714c80551279808e7',
                lang: 1,
                contents: '2017년09월11일 공지 ~~~'
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        // it("PUT returns status code 200", function(done) {
        //     request(app)
        //     .put('/boards/59b63082e6dca91f607c7066')
        //     .expect(200)
        //     .send({
        //         category: '59b5f84714c80551279808e8',
        //         lang: 1,
        //         title:"공지2017년",
        //         contents: '2017년09월11일 공지 ~~~'
        //     })
        //     .end((err, res) => {
        //         if(err){
        //             done(err);
        //         }else{
        //             done();
        //         }
        //     });
        // });

        it("PUT returns status code 400", function(done) {
            request(app)
            .put('/boards/59b63082e6dca91f607c7066')
            .expect(400)
            .send({
                category: '59b5f84714c80551279808e4',
                lang: 1,
                title:"공지2017년",
                contents: '2017년09월11일 공지 ~~~'
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        it("DELETE returns status code 400", function(done) {
            request(app)
            .delete('/boards/59b63082e6dca91f607c7062')
            .expect(400)
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });
    });

    describe("/boards/categories", function() {
        it("GET returns status code 200", function(done) {
            request(app)
            .get('/boards/categories')
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        // it("POST returns status code 201", function(done) {
        //     request(app)
        //     .post('/board/category')
        //     .send({
        //         name:'공지사항',
        //         desc:'기본 공지사항'
        //     })
        //     .expect(400)
        //     .end((err, res) => {
        //         if(err){
        //             done(err);
        //         }else{
        //             done();
        //         }
        //     });
        // });

        it("POST returns status code 400", function(done) {
            request(app)
            .post('/boards/categories')
            .send({
                name:'detail공지2',
                desc:'기본 공지사항 게시물'
            })
            .expect(400)
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        it("PUT returns status code 200", function(done) {
            request(app)
            .put('/boards/categories/59b5f90214c805512798093c')
            .expect(200)
            .send({
                name:'공지사항~~1'
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        it("PUT returns status code 400", function(done) {
            request(app)
            .put('/boards/categories/59b5f90214c805512798023c')
            .expect(400)
            .send({
                name:'공지사항~~1'
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        it("PUT returns status code 400", function(done) {
            request(app)
            .put('/boards/categories/59b5f90214c805512798023c')
            .expect(400)
            .send({
                name:'공지사항~~1'
            })
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });

        it("DELETE returns status code 400", function(done) {
            request(app)
            .delete('/boards/categories/59b5f90214c805512798022c')
            .expect(400)
            .end((err, res) => {
                if(err){
                    done(err);
                }else{
                    done();
                }
            });
        });
    });
});