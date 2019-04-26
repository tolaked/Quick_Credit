import chai from "chai";
import app from "../app";
import userData from "../model/userData";
import faker from "faker";
import supertest from "supertest";
import chaiHttp from "chai-http";
import { getMaxListeners } from "cluster";

chai.use(chaiHttp);

const { expect } = chai;

// Test suite for home route
describe("GET /", () => {
  it("Should redirect to home route", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty("message");
        expect(body.data[0].message).to.be.a("string");

        done();
      });
  });
});

describe("GET *", () => {
  it("Should throw a 404 error", done => {
    chai
      .request(app)
      .get("/dsd")
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

//   Test suite for POST /signup route
describe("POST api/v1/auth/signup", () => {
  it("Should successfully create a user account if inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "alamu@gmail.com",
        firstName: "maryde",
        lastName: "alamu",
        password: "Sweetmum",
        address: "20,Okusaga"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty("token");
        expect(body.data[0].token).to.be.a("string");
        done();
      });
  });
});

describe("POST api/v1/auth/signup", () => {
  it("Should throw an error if email already exists", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "bayomi@gmail.com",
        firstName: "maryde",
        lastName: "alamu",
        password: "Sweetmum",
        address: "20,Okusaga"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("user already exists");
        done();
      });
  });
});

// Test for invalid signup details
describe("POST api/v1/auth/signup", () => {
  it("Should return an error if signup inputs are invalid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.message).to.be.a("string");

        describe("POST api/v1/auth/signup", () => {
          it("Should successfully create a user account if inputs are valid", done => {
            chai
              .request(app)
              .post("/api/v1/auth/signup")
              .send({
                email: "debo@gmail.com",
                firstName: "maryde",
                lastName: "alamu",
                password: "Sweetmum",
                address: "20,Okusaga"
              })
              .end((err, res) => {
                if (err) done();
                const { body } = res;
                expect(body).to.be.an("object");
                expect(body.status).to.be.a("number");
                expect(body.status).to.be.equals(200);
                expect(body.data).to.be.an("array");
                expect(body.data[0]).to.be.an("object");
                expect(body.data[0]).to.haveOwnProperty("token");
                done();
              });
          });
        });

        done();
      });
  });
});

//   Test suite for POST /login route
describe("POST api/v1/auth/login", () => {
  it("Should successfully login a user account if inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "firstuser@gmail.com", password: "Sweetmum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(res.body).to.have.property("data");
        done();
      });
  });
});

// Test suite for POST /login route invalid
describe("POST api/v1/auth/login", () => {
  it("Should return an error if login inputs are invalid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "dim@gmail.com", password: "Sweeum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("User does not exist");
        done();
      });
  });
});

// Test suite for POST /login route invalid
describe("POST api/v1/auth/login", () => {
  it("Should return an error if required credentials are not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "dim@gmail.com" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.message).to.be.a("string");
        done();
      });
  });
});
// Test suite for POST /login route invalid
describe("POST api/v1/auth/login", () => {
  it("Should return an error if user does not exist", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "dim@gmail.com", password: "ghdjyyf" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equals("User does not exist");
        done();
      });
  });
});

// Test suite for all repaid loans
describe("GET api/v1/auth/loans/3/repayments", () => {
  it("Should successfully get all loan repayment", done => {
    chai
      .request(app)
      .get("/api/v1/auth/loans/3/repayments")
      .send({
        user: "bayomi@gmail.com",
        createdOn: "2019-04-22T14:34:25.265Z",
        status: "approved",
        repaid: true,
        tenor: 3,
        amount: 400000,
        paymentInstallment: 140000,
        balance: 420000,
        interest: 20000
      })
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

// Test suite for No loan record found
describe("GET api/v1/auth/loans/9/repayments", () => {
  it("Should throw an error if no record found", done => {
    chai
      .request(app)
      .get("/api/v1/auth/loans/9/repayments")
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(409);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("No loan record found");
        done();
      });
  });
});

// Test suite for no repaid loans
describe("GET api/v1/auth/loans/1/repayments", () => {
  it("Should successfully throw an error if no repaid loans", done => {
    chai
      .request(app)
      .get("/api/v1/auth/loans/1/repayments")
      .send({
        user: "firstuser@gmail.com",
        createdOn: "2019-04-22T14:34:25.265Z",
        status: "pending",
        repaid: false,
        tenor: 3,
        amount: 400000,
        paymentInstallment: 140000,
        balance: 420000,
        interest: 20000
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(409);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("No repaid loans");
        done();
      });
  });
});

// Test suite to create loan application
describe("POST api/v1/auth/loans", () => {
  it("Should successfully create a loan application", done => {
    chai
      .request(app)
      .post("/api/v1/auth/loans")
      .send({ tenor: 3, amount: 800000 })
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

// Test suite to create loan application
describe("POST api/v1/auth/loans", () => {
  it("Should return an error if required inputs are not provided", done => {
    chai
      .request(app)
      .post("/api/v1/auth/loans")
      .send({ tenor: 3 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.message).to.be.an("string");
        done();
      });
  });
});
// Test suite to create loan application
describe("POST api/v1/auth/loans", () => {
  it("Should return an error if required inputs are incorrect", done => {
    chai
      .request(app)
      .post("/api/v1/auth/loans")
      .send({ tenor: "ab", amount: "gdg" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.message).to.be.an("string");
        done();
      });
  });
});
