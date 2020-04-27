process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('API', () => {
  console.log(server);
  console.log(chaiHttp);
  describe('/GET home', () => {
    it('it should GET any reply', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET movies', () => {
    it('it should GET any reply with a movies json', (done) => {
      chai.request(server)
        .get('/movies')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  });
  
  describe('/GET Reviewer', () => {
    it('it should GET any reply with a reviewer json', (done) => {
      chai.request(server).get('/reviewers').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET publications', () => {
    it('it should GET any reply with a publications json', (done) => {
      chai.request(server).get('/publications').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET pending', () => {
    it('it should GET any reply with a pending json', (done) => {
      chai.request(server).get('/pending').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});