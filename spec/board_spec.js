require('dotenv').config();
const request = require('supertest');
const mongooseConnection = require('../bin/mongooseConnection');
const expect = require('chai').expect;
const app = require('../app');

describe("board test", function () {
  let categoryId;
  let boardId;

  before(function (done) {
    mongooseConnection
    .connect()
    .then((data) => {
      done();
    })
    .catch(done);
  });

  before(function (done) {
    let dateString = new Date();
    request(app)
      .post('/boards/categories')
      .send({
        name: 'test ' + dateString,
        desc: '기본 공지사항 게시물'
      })
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        categoryId = res.body.data._id;
        done();
      });
  });

  describe("/boards/categories", function () {
    it("GET returns status code 200", function (done) {
      request(app)
        .get('/boards/categories')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it("PUT returns status code 200", function (done) {
      request(app)
        .put('/boards/categories/'+categoryId)
        .expect(200)
        .send({
          name: '공지사항~~1'
        })
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
  });

  describe("/board", function () {
    before((done) => {
      request(app)
      .post('/boards')
      .expect(201)
      .send({
          category: categoryId,
          lang: 1,
          title: '2017년09월11일 공지',
          contents: '2017년09월11일 공지 ~~~'
      })
      .end((err, res) => {
        if (err) done(err);
        boardId = res.body.data._id;
        done();
      });
    });

    it("POST returns status code 400", function (done) {
      request(app)
        .post('/boards')
        .expect(400)
        .send({
          category: categoryId + '1',
          lang: 1,
          contents: '2017년09월11일 공지 ~~~'
        })
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it("GET returns status code 200", function (done) {
      request(app)
        .get('/boards')
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it("GET returns status code 200", function (done) {
      request(app)
        .get('/boards/' + boardId)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it("PUT returns status code 200", function(done) {
      request(app)
        .put('/boards/' + boardId)
        .expect(200)
        .send({
            category: categoryId,
            lang: 1,
            title:"공지2017년",
            contents: '2017년09월11일 공지 ~~~'
        })
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    it("PUT returns status code 400", function (done) {
      request(app)
        .put('/boards/' + boardId + '1')
        .expect(400)
        .send({
          category: categoryId,
          lang: 1,
          title: "공지2017년",
          contents: '2017년09월11일 공지 ~~~'
        })
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });

    after((done) => {
      request(app)
        .delete('/boards/' + boardId)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          done();
        });
    });
  });

  after(function(done) {
    request(app)
    .delete('/boards/categories/'+categoryId)
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      done();
    });
  });
});
