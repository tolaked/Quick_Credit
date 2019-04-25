import chai from "chai";
import app from "../app";
import userData from "../model/userData";
import faker from "faker";
import supertest from "supertest";
import chaiHttp from "chai-http";
import models from "../model/userData";
const Loan = models.Loans;
chai.use(chaiHttp);

const { expect } = chai;

// Test for an admin to verify a user
describe("POST api/v1/users/bayomi@gmail.com/verify", () => {
  it("Should mark a user as verified", done => {
    chai
      .request(app)
      .patch("/api/v1/users/bayomi@gmail.com/verify")
      .send({ status: "verified" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equal("user already verified");

        done();
      });
  });
});

describe("POST api/v1/users/bayomi@gmail.com/verify", () => {
  it("Should return an error if a user is already verified", done => {
    chai
      .request(app)
      .patch("/api/v1/users/bayomi@gmail.com/verify")
      .send({ status: "verified" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.message).to.be.an("string");
        expect(body.message).to.be.equal("user already verified");
        done();
      });
  });
});

describe("GET api/v1/loans/1", () => {
  it("Should get a specific loan by id", done => {
    chai
      .request(app)
      .get("/api/v1/loans/1")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(201);
        expect(body.data).to.be.an("object");
        expect(body.data).to.be.haveOwnProperty("user");
        done();
      });
  });
});
// Test suite for non existence of a particular loan
describe("GET api/v1/loans/:8", () => {
  it("Should get a specific loan by id", done => {
    chai
      .request(app)
      .get("/api/v1/loans/:8")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equal("Loan does not exist");
        done();
      });
  });
});

// Test suite to get all loan applictions
describe("GET api/v1/loans", () => {
  it("Should get all loan applications", done => {
    chai
      .request(app)
      .get("/api/v1/loans")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        done();
      });
  });
});
// Test suite to get all repaid loans
describe("GET api/v1/loans?status=approved&repaid=true", () => {
  it("should view all paid loans successfully", done => {
    chai
      .request(app)
      .get("/api/v1/loans?status=approved&repaid=true")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0]).to.be.haveOwnProperty("user");
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("GET api/v1/loans?status=approved&repaid=true", () => {
  it("should view all paid loans successfully", done => {
    chai
      .request(app)
      .get("/api/v1/loans?status=approved&repaid=true")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("GET api/v1/loans?status=approved&repaid=false", () => {
  it("should view all paid loans successfully", done => {
    chai
      .request(app)
      .get("/api/v1/loans?status=approved&repaid=false")
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0]).to.be.haveOwnProperty("user");
        done();
      });
  });
});
