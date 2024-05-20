
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('./server');

describe('GET /data', function() {
  it('respond with json containing a list of all items', function(done) {
    request(app)
      .get('/data')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        done();
      });
  });
});
