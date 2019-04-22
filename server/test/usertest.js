import chai from 'chai';
import app from '../app';
import userData from '../model/userData';
import faker from 'faker';
import supertest from 'supertest';
import chaiHttp from 'chai-http';



chai.use(chaiHttp);

const { expect } = chai;

// Test suite for home route
describe('GET /', () => {
    it('Should redirect to home route', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(200);
          expect(body.data[0]).to.haveOwnProperty('message');
          expect(body.data[0].message).to.be.a('string');
          done();
        });
    });
  });

  describe('GET *', () => {
    it('Should throw a 404 error', (done) => {
      chai
        .request(app)
        .get('/dsd')
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(404);
          expect(body.error).to.be.a('string');
          done();
        });
    });
  });

//   Test suite for POST /signup route
describe('POST api/v1/auth/signup', () => {
  it('Should successfully create a user account if inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      status: 'unverified'})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
  



