const app = require('../app');
const request = require('supertest');

describe('GET /', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('Connection', function() {

  var token = '';

  before(function(done) {
    this.timeout(0);
    request(app)
    .post('/auth/signin')
    .send({username: "elprofe", password: "Hola1234"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      token = res.body.token;
      return done();
    });
  });

  describe('GET /auth/session', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/auth/session')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /password/getPasswords', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/password/getPasswords')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /cuentas/getAccounts', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/cuentas/getAccounts')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /document/getDocuments', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/document/getDocuments')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('GET /news/getNoticias', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/news/getNoticias')
        .set('Accept', 'application/json')
        .set('x-access-token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

});
