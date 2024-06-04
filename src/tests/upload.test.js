const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const server = require('../../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('File Upload', () => {
  it('should upload a file and return the formatted code', (done) => {
    chai.request(server)
      .post('/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', fs.readFileSync(path.join(__dirname, 'testFile.java')), 'testFile.java')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.a('string');
        expect(res.text).to.include('formatted'); // Assuming the formatted code contains the word "formatted"
        done();
      });
  });
});



