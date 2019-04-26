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
  it("should view all unpaid loans successfully", done => {
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

// Test suite to get all repaid loans
describe("PATCH api/v1/loans/1", () => {
  it("should successfully approve a loan", done => {
    chai
      .request(app)
      .patch("/api/v1/loans/1")
      .send({
        status: "approved"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("object");
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("PATCH api/v1/loans/8", () => {
  it("should throw an error if no loan found", done => {
    chai
      .request(app)
      .patch("/api/v1/loans/8")
      .send({ status: "approved" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equals("Loan not found");
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("PATCH api/v1/loans/3", () => {
  it("should throw an error if loan already approved", done => {
    chai
      .request(app)
      .patch("/api/v1/loans/3")
      .send({
        status: "approved"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(409);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equals(
          "This loan has been approved previously"
        );
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("PATCH api/v1/loans/2", () => {
  it("should throw an error if no required field ", done => {
    chai
      .request(app)
      .patch("/api/v1/loans/2")
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

// Test suite to get all repaid loans
describe("PATCH api/v1/loans/2", () => {
  it("should throw an error if required field is invalid", done => {
    chai
      .request(app)
      .patch("/api/v1/loans/2")
      .send({ status: "33" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

// Test suite to POST loan repayment in favour of a client
describe("POST api/v1/loans/1/repayment", () => {
  it("should successfully post loan repayment in favour of a client", done => {
    chai
      .request(app)
      .post("/api/v1/loans/1/repayment")
      .send({ paidAmount: 50000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(200);
        expect(body.data).to.be.an("object");
        expect(body.data).to.haveOwnProperty("user");
        done();
      });
  });
});

// Test suite to POST loan repayment in favour of a client
describe("POST api/v1/loans/3/repayment", () => {
  it("should throw an error if loan has been repaid", done => {
    chai
      .request(app)
      .post("/api/v1/loans/3/repayment")
      .send({ paidAmount: 500000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(409);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals(
          "Loan with the id 3 has been fully repaid"
        );
        done();
      });
  });
});

// Test suite to POST loan repayment in favour of a client
describe("POST api/v1/loans/30/repayment", () => {
  it("should throw an error if no loan found", done => {
    chai
      .request(app)
      .post("/api/v1/loans/30/repayment")
      .send({ paidAmount: 500000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("No loan found");
        done();
      });
  });
});
// Test suite to POST loan repayment in favour of a client
describe("POST api/v1/loans/1/repayment", () => {
  it("should throw an error if there is no required input", done => {
    chai
      .request(app)
      .post("/api/v1/loans/1/repayment")
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.error).to.be.an("string");
        done();
      });
  });
});

describe("POST api/v1/loans/1/repayment", () => {
  it("should throw an error if required input is invalid", done => {
    chai
      .request(app)
      .post("/api/v1/loans/1/repayment")
      .send({ paidAmount: "hdhd" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.error).to.be.an("string");
        done();
      });
  });
});

describe("POST api/v1/loans/4/repayment", () => {
  it("should throw an error if amount posted exceeds the remaining balance", done => {
    chai
      .request(app)
      .post("/api/v1/loans/4/repayment")
      .send({ paidAmount: 4000000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(409);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals(
          "amount greater than remaining balance"
        );
        done();
      });
  });
});
