const path = process.cwd();
var request = require('supertest');
var mongooseConnection = require(path + '/bin/mongooseConnection');
const config = require(path + '/config');
var expect = require('chai').expect;
var app = require('../app');

const Board = require(path + "/models/board");

describe("board test", function() {
    beforeEach(function (done) {
        if(!mongooseConnection.isConnected()){
            mongooseConnection.connect(done);
        }else{
            done();
        }
    });

    describe("db", function() {
        it("db test", function(done){
            Board.count({lang:1})
            .exec((error, count) => {
                console.log(typeof count);
                done();
            })
        });
    });

    describe("/board", function() {
        it("GET returns status code 200", function(done) {
            request(app)
            .get('/board')
            .expect(200)
            .end((err, res) => {
                if(err){
                    console.error(err);
                    done(err);
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
            .post('/board')
            .expect(400)
            .send({
                category: '59b5f84714c80551279808e8',
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
    });

    describe("/board/category", function() {
        it("GET returns status code 200", function(done) {
            request(app)
            .get('/board/category')
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
            .post('/board/category')
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
    });
});