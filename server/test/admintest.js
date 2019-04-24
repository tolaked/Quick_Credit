import chai from 'chai';
import app from '../app';
import userData from '../model/userData';
import faker from 'faker';
import supertest from 'supertest';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

// Test for an admin to verify a user
describe('POST api/v1/users/firstuser@gmail.com/verify', () => {
    it('Should mark a user as verified', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/firstuser@gmail.com/verify')
        .send({status: 'verified'})
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(404);
          expect(body.message).to.be.a('string');
          expect(body.message).to.be.equal('user already verified');
  
          done();
        });
    });
  });

  describe('POST api/v1/users/firstuser@gmail.com/verify', () => {
    it('Should return an error if a user is already verified', (done) => {
      chai
        .request(app)
        .patch('/api/v1/users/firstuser@gmail.com/verify')
        .send({status: 'verified'})
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(404);
          expect(body.message).to.be.an('string');
          expect(body.message).to.be.equal('user already verified');
          done();
        });
    });
  });

  describe('GET api/v1/loans/1', () => {
    it('Should get a specific loan by id', (done) => {
      chai
        .request(app)
        .get('/api/v1/loans/1')
        .send()
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(201);
          expect(body.data).to.be.an('object');
          expect(body.data).to.be.haveOwnProperty('user');
          done();
        });
    });
  });
 