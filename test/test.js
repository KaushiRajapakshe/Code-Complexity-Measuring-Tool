var expect = require("chai").expect;
var request = require("request");
const app = require('./server');

var url = "http://localhost:3000/api/complexity/factors";

let factor = {
    _id: '6654e1cdc61b899de028d42f',
    Cs: 'true',
    Cts: 'true',
    Cnc: 'true',
    Ci: 'true',
    Tw: 'true',
    Cps: 'true',
    Cr: 'true',
    Cp: 'true',
    id: 'sdfgh101',
    factorstatus: 'system'
}
describe('Complexity Post API', function () {
    it('post Complexity factor to database', function (done) {
        request.post({ url: url, form: factor }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    it("returns statusCode in body to check if api give right responed should be 200", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
});

describe('Complexity Post API', function () {
    it("returns the result of factor object", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("returns the result of factor object", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
});

describe("Complexity Get API", function () {
    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("returns statusCode in body to check if api give right responed should be 200", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
    it("returns the result of complexity object", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body)
            expect(body.message).to.be.equal("Get user undefined's factors of complexity success");
            done()
        });
    });

    it("returns the result of factor object", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body)
            expect(body.message).to.be.equal("Get user undefined's factors of complexity success");
            done()
        });
    });

});

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