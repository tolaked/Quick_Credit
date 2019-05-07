import chai from "chai";
import app from "../app";
import userData from "../model/userData";
import supertest from "supertest";
import chaiHttp from "chai-http";
import { getMaxListeners } from "cluster";
import faker from "faker";

chai.use(chaiHttp);

const { expect } = chai;

let signUpuserToken;
let userToken;
let unAuthorizedUserToken;
let DbUserToken;
let loggedInUserToken;
let clientToken;
let id;

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Sweetmum",
  address: "20,Okusaga"
};

const wronguser = {
  firstname: faker.name.firstName(),
  lastame: faker.name.lastName(),
  email: faker.internet.email(),
  passwrd: "Sweetmum",
  address: ""
};

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
        signUpuserToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        expect(body.data.token).to.be.a("string");
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

describe("POST api/v1/auth/signup", () => {
  it("Should throw an error if email input is invalid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "bayomigmailcom",
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
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.a("string");
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
      .send({ email: "khalid@gmail.com", password: "Sweetmum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        userToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        expect(body.data.token).to.be.a("string");
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

// Test suite to create loan application
describe("POST api/v1/loans", () => {
  it("Should successfully create a loan application", done => {
    chai
      .request(app)
      .post("/api/v1/loans")
      .set("token", userToken)
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

// Test suite for all repaid loans
describe("GET api/v1/loans/3/repayments", () => {
  it("Should successfully get all loan repayment", done => {
    chai
      .request(app)
      .get("/api/v1/loans/3/repayments")
      .set("token", userToken)
      .send({
        user: "khalid@gmail.com",
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
describe("GET api/v1/loans/9/repayments", () => {
  it("Should throw an error if no record found", done => {
    chai
      .request(app)
      .get("/api/v1/loans/9/repayments")
      .set("token", userToken)
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
describe("GET api/v1/loans/1/repayments", () => {
  it("Should throw an error if no repaid loans", done => {
    chai
      .request(app)
      .get("/api/v1/loans/1/repayments")
      .set("token", userToken)
      .send({
        user: "bayomi@gmail.com",
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
describe("POST api/v1/loans", () => {
  it("Should return an error if required inputs are not provided", done => {
    chai
      .request(app)
      .post("/api/v1/loans")
      .set("token", userToken)
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
describe("POST api/v1/loans", () => {
  it("Should return an error if required inputs are incorrect", done => {
    chai
      .request(app)
      .post("/api/v1/loans")
      .set("token", userToken)
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

// AMIN ROUTES TESTS=============

// Test for an admin to verify a user
describe("POST api/v1/users/bayomi@gmail.com/verify", () => {
  it("Should mark a user as verified", done => {
    chai
      .request(app)
      .patch("/api/v1/users/bayomi@gmail.com/verify")
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
      .send({ paidamount: 50000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
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
      .set("token", userToken)
      .send({ paidamount: 500000 })
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
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
      .set("token", userToken)
      .send({ paidamount: 4000000 })
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
        unAuthorizedUserToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        expect(body.data.token).to.be.a("string");
        done();
      });
  });
});

// Test Suite POST/ post loan repayment
describe("POST api/v1/loans/4/repayment", () => {
  it("should throw an error if an unauthorized user tries to access post loan route", done => {
    chai
      .request(app)
      .post("/api/v1/loans/4/repayment")
      .set("token", unAuthorizedUserToken)
      .send({ paidamount: 4000000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("Unauthorized access,admin only route");
        done();
      });
  });
});

// Test Suite POST/ Admin verify user
describe("PATCH api/v1/users/bimpe@gmail.com/verify", () => {
  it("should throw an error if an unauthorized user tries to access post loan route", done => {
    chai
      .request(app)
      .patch("/api/v1/users/bimpe@gmail.com/verify")
      .set("token", unAuthorizedUserToken)
      .send({ status: "verified" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("Unauthorized access,admin only route");
        done();
      });
  });
});
