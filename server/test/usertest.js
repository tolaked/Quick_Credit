import chai from "chai";
import app from "../app";
import chaiHttp from "chai-http";
import faker from "faker";
import bcrypt from "bcryptjs";
import validation from "../validation/validation";

chai.use(chaiHttp);

const { expect } = chai;

let userToken;
let unAuthorizedUserToken;
let loanUserToken;
let loggedInUserToken;
let DbUserToken;
let signUpuserToken;
let newUserToken;
let clientToken;

let hhh;
let id;
let DbId;
let loanToken;


const user = {
  firstName: "Adeola",
  lastName: "Laide",
  email: "lamijih@gmail.com",
  password: "Sweetmum",
  address: "20,Okusaga"
};

const userDb = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: "Sweetmum",
  address: "20,Okusaga"
};

const wronguser = {
  firstName: "Adeola",
  lastName: "Laid3e",
  email: "lamijih@gmail.com",
  password: "Sweetmum",
  address: "20,Okusaga"
};

const wronguserDb = {
  firstname: "Adeola",
  lastname: "Laid3e",
  email: "lamijih@gmail.com",
  password: "Sweetmum",
  address: "20,Okusaga"
};

const wrongemail = {
  firstName: "Adeola",
  lastName: "Laid3e",
  email: "lamijih@gmail.com",
  password: "Sweetmum",
  address: "20,Okusaga"
};
const wronglogin = {
  efmail: "lamijihgmail.com",
  password: "Sweetmum"
};

const noemail = {
  efmail: "",
  password: "Sweetmum"
};
const nopassword = {
  efmail: "firstuser@gmail.com",
  password: ""
};

const newloan = {
  amount: 800000,
  tenor: 3
};
const noamount = {
  amount: "h",
  tenor: 3
};
const notenor = {
  amount: 55999,
  tenor: "gd"
};
const reject = {
  status: "hh"
};

const verify = {
  status: "verified"
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
        expect(body.data).to.be.an("array");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Welcome to QUICK CREDIT");
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
        expect(body.data.userDetails).to.be.an("object");
        expect(body.data.userDetails).to.haveOwnProperty("firstName");
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

// Test for invalid signup details
describe("POST api/v1/auth/signup", () => {
  it("Should return an error if signup inputs are invalid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "bayomijig@gmailcom",
        firstName: "ma#ryde",
        lastName: "alamu",
        password: "Sweetmum",
        address: "20,Okusaga"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equals(
          "Firstname is required and must contain only alphabets"
        );
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
      .send({
        email: "bayomijig@gmailcom",
        firstName: "maryde",
        lastName: "ala^mu",
        password: "Sweetmum",
        address: "20,Okusaga"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equals(
          "Lastname is required and must contain only alphabets"
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

//   Test suite for POST /login route
describe("POST api/v1/auth/login", () => {
  it("Should successfully login a user account if inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "bolaji@gmail.com", password: "Sweetmum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;

        loanUserToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        expect(body.data.token).to.be.a("string");
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
      .send({ email: "bimpe@gmail.com", password: "Sweetmum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;

        newUserToken = body.data.token;
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
      .set("token", loanUserToken)
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
describe("GET api/v1/loans/5/repayments", () => {
  it("Should successfully get all loan repayment", done => {
    chai
      .request(app)
      .get("/api/v1/loans/5/repayments")
      .set("token", userToken)
      .send({})
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
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("No loan record found");
        done();
      });
  });
});

// Test suite for user can not viw loan
describe("GET api/v1/loans/3/repayments", () => {
  it("Should throw an error if user tries to view a loan that is not theirs", done => {
    chai
      .request(app)
      .get("/api/v1/loans/3/repayments")
      .set("token", userToken)
      .send({})
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("Sorry, you can't view this loan");
        done();
      });
  });
});

// Test suite for no repaid loans
describe("GET api/v1/loans/6/repayments", () => {
  it("Should throw an error if no repaid loans", done => {
    chai
      .request(app)
      .get("/api/v1/loans/6/repayments")
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
      .send({ tenor: "ab", amount: 6000 })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.message).to.be.an("string");
        expect(body.message).to.be.equal(
          "tenor is required and must contain only numbers between 1 & 12"
        );
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
      .send({ tenor: 4, amount: "ggd" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(422);
        expect(body.message).to.be.an("string");
        expect(body.message).to.be.equal(
          "Amount is required and must contain only number"
        );
        done();
      });
  });
});

// AMIN ROUTES TESTS=============

// Test for an admin to verify a user
describe("POST api/v1/users/bayomi@gmail.com/verify", () => {
  it("Should return an error if user is already verified", done => {
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
        expect(body.status).to.be.equal(409);
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
        expect(body.status).to.be.equal(409);
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
describe("GET api/v1/loans?status=approd&repaid=false", () => {
  it("should throw an error ", done => {
    chai
      .request(app)
      .get("/api/v1/loans?status=approd&repaid=false")
      .set("token", userToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equal(404);
        expect(body.message).to.be.an("string");
        expect(body.message).to.be.equal("Not Found");
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


// test for POST /post repayment
describe(`GET api/v1/loans`, () => {
  it("should return an error for malformed token", done => {
    chai
      .request(app)
      .get(`/api/v1/loans`)
      .set("token", "HHG")
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(400);
        expect(body.error).to.be.an("object");
        expect(body.error).to.be.haveOwnProperty("message");
        expect(body.error.message).to.be.equal("jwt malformed");
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
      .send({ paidamount: 500000 })
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
        expect(body.error).to.be.equals(
          "paidamount is required and must contain only be a number or decimal"
        );
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
  it("should throw an error if an unauthorized user tries to verify a user", done => {
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


// test for GET /no token 
describe("POST api/v1/loans/4877/repayment", () => {
  it("should return an error if no token provided", done => {
    chai
      .request(app)
      .post("/api/v1/loans/4877/repayment")
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("Unauthorize, please login");
        done();
      });
  });
});


// tTESSSSSSSSSSSSSS=========IJHHHHHHHHHHH

// Test suite for hashPassword(password)
describe("Helper.hashPassword(password)", () => {
  it("Should return hashed password (string)", () => {
    const result = bcrypt.hashSync("Sweetmum");
    expect(result).to.be.a("string");
  });
});

// Test suite for comparePassword if password matches hash
describe("Helper.comparePassword(password, hashedPassword)", () => {
  it("Should return true if password matches hashed", () => {
    const result = bcrypt.compareSync(
      "Sweetmum",
      "$2a$10$bvHa7pGEVX/TRJs6IAAW2e1iO2sUmQ59tab4Cv9Xv4cB/KnJ6G6WS"
    );
    expect(result).to.be.equal(true);
  });
});

// Test suite for comparePassword if password matches hash
describe("Helper.comparePassword(password, hashedPassword)", () => {
  it("Should return true if password matches hashed", () => {
    const result = bcrypt.compareSync(
      "Sweetmum",
      "$2a$10$bvHa7pGEVX/TRJs6IAAW2e1iO2sUmQ59tab4Cv9Xv4cB/KnG6WS"
    );
    expect(result).to.be.equal(false);
  });
});

// Test suite for comparePassword if password matches hash
describe("validation.validateUser(user)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateUser(user);
    expect(result).to.be.an("object");
    expect(result).to.be.haveOwnProperty("value");
    expect(result.value).to.be.an("object");
    expect(result.value.firstName).to.be.a("string");
    expect(result.value.lastName).to.be.a("string");
    expect(result.value.email).to.be.a("string");
    expect(result.value.address).to.be.a("string");
    expect(result.value.isAdmin).to.be.a("string");
  });
});

// Test suite for comparePassword if password matches hash
describe("validation.validateUser(wronguser)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateUser(wronguser);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for comparePassword if password matches hash
describe("validation.validateUser(wrongemail)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateUser(wrongemail);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for comparePassword if password matches hash
describe("validation.validateUser(wrongemail)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLogin(wronglogin);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for no email input
describe("validation.validateUser(noemail)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLogin(noemail);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for no email input
describe("validation.validateUser(nopassword)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLogin(nopassword);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for validate loan
describe("validation.validateLoan(newloan)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLoan(newloan);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
    expect(result.value).to.be.an("object");
    expect(result.value.tenor).to.be.an("number");
  });
});

// Test suite for validate loan
describe("validation.validateLoan(noamount)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLoan(noamount);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for validate loan
describe("validation.validateLoan(noamount)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.validateLoan(notenor);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for validate loan
describe("validation.validateUser(verify)", () => {
  it("Should return true if password matches hashed", () => {
    chai.request(app).post("/api/v1/users/bimpe@gmail.com/verify");
    const result = validation.validateUser(verify);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

// Test suite for validate loan
describe("validation.approveOrReject(verify)", () => {
  it("Should return true if password matches hashed", () => {
    const result = validation.approveOrReject(reject);
    expect(result).to.be.an("object");
    expect(result).to.haveOwnProperty("error");
  });
});

//================= DATABASE TEST===============

//  Test suite for POST /signup route
describe("POST api/v2/auth/signup", () => {
  it("Should successfully create a user account if inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send(userDb)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        DbUserToken = body.data.token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        expect(body.data).to.haveOwnProperty("newUser");
        expect(body.data.newUser).to.be.an("object")
        expect(body.data.token).to.be.a("string");
        expect(body.data.newUser.lastName).to.be.a("string")

        done();
      });
  });
});

// test suite for POST /signup db user already exists
describe("POST api/v2/auth/signup", () => {
  it("should return an error if email already exists", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send({
        firstname: "alagba",
        lastname: "Adeola",
        email: "jame@gmail.com",
        password: "dele1989",
        address: "20,okusaga"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

describe("POST api/v2/auth/signup", () => {
  it("Should return an error if inputs are invalid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signup")
      .send(wronguserDb)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.an("string");
        done();
      });
  });
});

// test for POST /login suite
describe("POST api/v2/auth/signin", () => {
  it("should login successfully if user inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "Akeem19@hotmail.com",
        password: "Sweetmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        loggedInUserToken = body.data[0].token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Logged in successfully");
        expect(body.data[0].user).to.be.an("object");
        expect(body.data[0].token).to.be.a("string");



        done();
      });
  });
});

// test for POST /login suite
describe("POST api/v2/auth/signin", () => {
  it("should return an error if inputs are invalid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        emal: "Amari_Cronin20@yahoo.com",
        password: "Sweetmum"
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
// /test for POST /login suite
describe("POST api/v2/auth/signin", () => {
  it("should return an error if user does not exist", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "Amari_Croniden@gmailcom",
        password: "SweetTmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("User does not exist");

        done();
      });
  });
});

// test for POST /login suite
describe("POST api/v2/auth/signin", () => {
  it("should return an error for invalid password", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "Akeem19@hotmail.com",
        password: "SweedtTmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(401);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("Invalid Email/Password");

        done();
      });
  });
});

// test for POST /to verify user
describe(`PATCH api/v2/users/${userDb.email}/verify`, () => {
  it("should successfully verify a user", done => {
    chai
      .request(app)
      .patch(`/api/v2/users/${userDb.email}/verify`)
      .set("token", loggedInUserToken)
      .send({
        status: "verified"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.a("object");

        done();
      });
  });
});

// test for POST /verify user
describe(`PATCH api/v2/users/${user.email}/verify`, () => {
  it("should return an error if user is not an admin", done => {
    chai
      .request(app)
      .patch(`/api/v2/users/${user.email}/verify`)
      .set("token", userToken)
      .send({
        status: "verified"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("!!!Unauthorized, admin only route");
        done();
      });
  });
});

// test for PATCH /to verify user
describe("PATCH api/v2/users/Kacie.Legros52@yahoo.com/verify", () => {
  it("should return an error if user is already verified", done => {
    chai
      .request(app)
      .patch("/api/v2/users/Kacie.Legros52@yahoo.com/verify")
      .set("token", loggedInUserToken)
      .send({
        status: "verified"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a("string");

        done();
      });
  });
});

// test for POST /to create loan application
describe("POST api/v2/loans", () => {
  it("should successfully create a loan application", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", DbUserToken)
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        id = res.body.data.Loan.id;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.a("object");
        expect(body.data.Loan).to.be.a("object");
        expect(body.data.Loan.id).to.be.a("number");
        expect(body.data.Loan.clientemail).to.be.a("string");
        expect(body.data.Loan.paymentinstallment).to.be.a("number");
        expect(body.data.Loan.balance).to.be.a("number");
        expect(body.data.Loan.interest).to.be.a("number");
        expect(body.data.Loan.tenor).to.be.a("number");
        expect(body.data.Loan.amount).to.be.a("number");
        done();
      });
  });
});

// test for POST /to create loan application
describe("POST api/v2/loans", () => {
  it("should return an error if no required input", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", DbUserToken)
      .send({
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.a("string");
        done();
      });
  });
});

// test for POST /to create loan application
describe("POST api/v2/loans", () => {
  it("should return an error if input is invalid", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", DbUserToken)
      .send({
        amount: "rgtft",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.a("string");
        done();
      });
  });
});

// test for POST /to create loan application
describe("GET api/v2/loans/1", () => {
  it("should view a specific loan by id", done => {
    chai
      .request(app)
      .get("/api/v2/loans/1")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.a("object");
        expect(body.data.id).to.be.a("number");
        expect(body.data.clientemail).to.be.a("string");
        expect(body.data.tenor).to.be.a("number");
        expect(body.data.amount).to.be.a("number");
        expect(body.data.paymentinstallment).to.be.a("number");
        expect(body.data.balance).to.be.a("number");
        expect(body.data.interest).to.be.a("number");
        done();
      });
  });
});

// test for POST /unauthorized user, create loan application
describe("POST api/v2/loans", () => {
  it("should return an error for unauthorized user", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", DbUserToken)
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
      
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("sorry, you can only apply for a loan at a time");
        done();
      });
  });
});

// test for POST /unauthorized access
describe("POST api/v2/loans", () => {
  it("should return an error if no token provided", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("Unauthorized!, you have to login");
        done();
      });
  });
});

// test for POST /to view loan
describe("GET api/v2/loans/1", () => {
  it("should throw an error if loan does not exist", done => {
    chai
      .request(app)
      .get("/api/v2/loans/899")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equal("Loan does not exist");
        done();
      });
  });
});

// test for POST /to approve loan application
describe(`PATCH api/v2/loans/${id}`, () => {
  it("should successfully approve a loan application", done => {
    chai
      .request(app)
      .patch(`/api/v2/loans/${id}`)
      .set("token", loggedInUserToken)
      .send({
        status: "approved"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        expect(body.data.clientemail).to.be.a("string");
        expect(body.data.id).to.be.a("number");
        expect(body.data.paymentinstallment).to.be.a("number");
        expect(body.data.tenor).to.be.a("number");
        expect(body.data.amount).to.be.a("number");
        expect(body.data.interest).to.be.a("number");
        expect(body.data.status).to.be.a("string");
        done();
      });
  });
});

// test for POST /to approve loan application
describe("PATCH api/v2/loans/34", () => {
  it("should return an error if loan has already been approved", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/34")
      .set("token", loggedInUserToken)
      .send({
        status: "approved"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.an("string");
        done();
      });
  });
});

// test for POST /to view loan application
describe("PATCH api/v2/loans/3464", () => {
  it("should return an error if loan is not found", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/3474")
      .set("token", loggedInUserToken)
      .send({
        status: "approved"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        console.log(body)
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("loan not found");
        done();
      });
  });
});

// test for POST /unauthorized user, approve loan application
describe("PATCH api/v2/loans/34", () => {
  it("should return an error for unauthorized user to approve loan application", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/34")
      .set("token", userToken)
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        done();
      });
  });
});

// test for POST /unauthorized access to approve loan applicaion
describe("PATCH api/v2/loans/34", () => {
  it("should return an error if  user tries to approve loan application with no token provided", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/34")
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("Unauthorized!, you have to login");
        done();
      });
  });
});

// test for POST /no required input field
describe("PATCH api/v2/loans/34", () => {
  it("should return an error if required input is not provided", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/34")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.an("string");
        done();
      });
  });
});

// test for POST /to create loan application
describe("POST api/v2/loans", () => {
  it("should return an error if a user with a pending loan tries to make another loan application", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", DbUserToken)
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equals(
          "sorry, you cannot apply for a loan at the moment, you have an outstanding loan"
        );
        done();
      });
  });
});

// test for POST /login suite /For more than a loan at a time
describe("POST api/v2/auth/signin", () => {
  it("should login successfully if user inputs are valid", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email: "Lora_Weber@yahoo.com",
        password: "Sweetmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        clientToken = body.data[0].token;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Logged in successfully");
        expect(body.data[0].user).to.be.an("object");
        expect(body.data[0].token).to.be.a("string");

        done();
      });
  });
});


// test for GET /Admin get all loans
describe("POST api/v2/loans", () => {
  it("should successfully return all loan applications", done => {
    chai
      .request(app)
      .get("/api/v2/loans")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].interest).to.be.a("number");
        expect(body.data[0].tenor).to.be.a("number");
        expect(body.data[0].amount).to.be.a("number");
        expect(body.data[0].id).to.be.a("number");
        expect(body.data[0].status).to.be.a("string");
        expect(body.message).to.be.a("string");
        done();
      });
  });
});

// test for GET /Admin get a loan repayment record
describe("POST api/v2/loans/66/repayments", () => {
  it("should get loan repayments", done => {
    chai
      .request(app)
      .get("/api/v2/loans/66/repayments")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].id).to.be.a("number");
        expect(body.data[0].monthlyinstallment).to.be.a("number");
        expect(body.data[0].paidamount).to.be.a("number");
        expect(body.data[0].balance).to.be.a("number");
        done();
      });
  });
});

// // test for GET /Admin get a loan repayment record
describe("POST api/v2/loans/36777/repayments", () => {
  it("should return an error if no loan record found", done => {
    chai
      .request(app)
      .get("/api/v2/loans/36777/repayments")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equals("no repayment record found");
        done();
      });
  });
});

 // test for GET /Admin post loan repayment infavour of a client
describe(`POST api/v2/loans/${id}/repayment`, () => {
  it("should post loan repayment in favour of a client", done => {
    chai
      .request(app)
      .post(`/api/v2/loans/${id}/repayment`)
      .set("token", loggedInUserToken)
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an("object");
        expect(body.data.id).to.be.a("number");
        expect(body.data.client).to.be.a("string");
        expect(body.data.amount).to.be.a("number");
        expect(body.data.loanid).to.be.a("number");
        expect(body.data.monthlyinstallment).to.be.a("number");
        expect(body.data.balance).to.be.a("number");
        expect(body.data.paidamount).to.be.a("number");
        done();
      });
  });
});

// test for GET /Admin post loan repayment infavour of a client
describe("POST api/v2/loans/4877/repayment", () => {
  it("should return an error if no loan found", done => {
    chai
      .request(app)
      .post("/api/v2/loans/4877/repayment")
      .set("token", loggedInUserToken)
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equal("loan not found");
        done();
      });
  });
});

// // test for GET /Admin post loan repayment infavour of a client
describe(`POST api/v2/loans/${id}/repayment`, () => {
  it("should return an error if paidamount exceeds loan amount", done => {
    chai
      .request(app)
      .post(`/api/v2/loans/${id}/repayment`)
      .set("token", loggedInUserToken)
      .send({ paidamount: "100000000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.message).to.be.a("string");
        expect(body.message).to.be.equal(
          "Paid amount can not be greater than balance"
        );
        done();
      });
  });
});

// test for GET /Admin post loan repayment infavour of a client
describe(`POST api/v2/loans/${id}/repayment`, () => {
  it("should return an error if no input field", done => {
    chai
      .request(app)
      .post(`/api/v2/loans/${id}/repayment`)
      .set("token", loggedInUserToken)
      .send({})
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.a("string");
        done();
      });
  });
});

// test for POST /post repayment
describe(`POST api/v2/loans/${id}/repayment`, () => {
  it("should return an error if user is not an admin", done => {
    chai
      .request(app)
      .post(`/api/v2/loans/${id}/repayment`)
      .set("token", userToken)
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("!!!Unauthorized, admin only route");
        done();
      });
  });
});


// test for POST /get all loans 
describe(`GET api/v2/loans`, () => {
  it("should return an error if user is not an admin", done => {
    chai
      .request(app)
      .get(`/api/v2/loans`)
      .set("token", userToken)
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("!!!Unauthorized, admin only route");
        done();
      });
  });
});

// test for POST loan repayment /unauthorized access
describe(`POST api/v2/loans/${id}/repayment`, () => {
  it("should return an error if no token provided", done => {
    chai
      .request(app)
      .post(`/api/v2/loans/${id}/repayment`)
      .send({ paidamount: "500000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equals("Unauthorized!, you have to login");
        done();
      });
  });
});


// test for GET /Admin post loan repayment infavour of a client
describe("POST api/v2/loans/4877/repayment", () => {
  it("should return an error if no loan found", done => {
    chai
      .request(app)
      .post("/api/v2/loans/4877/repayment")
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(403);
        expect(body.error).to.be.a("string");
        expect(body.error).to.be.equal("Unauthorized!, you have to login");
        done();
      });
  });
});


// test for POST /post repayment
describe(`GET api/v2/loans`, () => {
  it("should return an error if user is not an admin", done => {
    chai
      .request(app)
      .get(`/api/v2/loans`)
      .set("token", "HHG")
      .send({ paidamount: "100000" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(400);
        expect(body.errors).to.be.an("array");
        expect(body.errors[0]).to.be.an("object");
        expect(body.errors[0]).to.be.haveOwnProperty("message");
        expect(body.errors[0].message).to.be.equal("jwt malformed");
        done();
      });
  });
});

// test for GET /Admin verify loan
describe(`PATCH api/v2/loans/${id}`, () => {
  it("should thrown an error if loan already verified", done => {
    chai
      .request(app)
      .patch(`/api/v2/loans/${id}`)
      .set("token", loggedInUserToken)
      .send({ status: "approved" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal(`loan with the id ${id} already verified`);
        done();
      });
  });
});


// test for GET /Admin verify user
describe(`PATCH api/v2/users/dejiakere@gmail.com/verify`, () => {
  it("should thrown an error if no user found", done => {
    chai
      .request(app)
      .patch("/api/v2/users/dejiakere@gmail.com/verify")
      .set("token", loggedInUserToken)
      .send({status:"verified"})
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("user not found");
        done();
      });
  });
});


// test for GET /Admin verify user
describe(`GET /api/v2/loans/%`, () => {
  it("should thrown an error if no user found", done => {
    chai
      .request(app)
      .get("/api/v2/loans/4%")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(500);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("internal server error");
        done();
      });
  });
});


// test for GET /Admin verify user
describe(`GET /api/v1/loans/%`, () => {
  it("should thrown an error if no user found", done => {
    chai
      .request(app)
      .get("/api/v1/loans/%")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(500);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("internal server error");
        done();
      });
  });
});



// test for POST /login suite
describe("POST api/v2/auth/signin", () => {
  it("should successfully login a user", done => {
    chai
      .request(app)
      .post("/api/v2/auth/signin")
      .send({
        email:"Ian63@hotmail.com",
        password: "Sweetmum"
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        loanToken= body.data[0].token
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].message).to.be.a("string");
        expect(body.data[0].message).to.be.equal("Logged in successfully");
        expect(body.data[0].user).to.be.an("object");
        expect(body.data[0].token).to.be.a("string");

        done();
      });
  });
});

// test for POST /to create loan application
describe("POST api/v2/loans", () => {
  it("should successfully create a loan application", done => {
    chai
      .request(app)
      .post("/api/v2/loans")
      .set("token", loanToken)
      .send({
        amount: "500000",
        tenor: "6"
      })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        DbId = body.data.Loan.id;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.a("object");
        expect(body.data.Loan).to.be.a("object");
        expect(body.data.Loan.id).to.be.a("number");
        expect(body.data.Loan.clientemail).to.be.a("string");
        expect(body.data.Loan.paymentinstallment).to.be.a("number");
        expect(body.data.Loan.balance).to.be.a("number");
        expect(body.data.Loan.interest).to.be.a("number");
        expect(body.data.Loan.tenor).to.be.a("number");
        expect(body.data.Loan.amount).to.be.a("number");
        done();
      });
  });
});


// test for GET /Admin verify loan
describe(`PATCH api/v2/loans/${DbId}`, () => {
  it("should successfully reject a loan", done => {
    chai
      .request(app)
      .patch(`/api/v2/loans/${DbId}`)
      .set("token", loggedInUserToken)
      .send({ status:"rejected" })
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("object");
        done();
      });
  });
});

// / test for GET /Should get all loan applications
describe("GET api/v2/loans/history", () => {
  it("should get all loansr", done => {
    chai
      .request(app)
      .get("/api/v2/loans/history")
      .set("token", loanToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an("array");
        expect(body.data[0]).to.be.an("object");
        expect(body.data[0].id).to.be.a("number");
        expect(body.data[0].clientemail).to.be.a("string");
        expect(body.data[0].amount).to.be.a("number");
        expect(body.data[0].balance).to.be.a("number");
        expect(body.data[0].interest).to.be.a("number");
        expect(body.data[0].status).to.be.a("string");
        done();
      });
  });
});


// / test for GET /Should get all loan applications
describe("GET api/v2/loans/6.8", () => {
  it("should return an error if something goes wrong", done => {
    chai
      .request(app)
      .get("/api/v2/loans/6.8")
      .set("token", loggedInUserToken)
      .send()
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(422);
        expect(body.message).to.be.an("string");
        expect(body.message).to.be.equal("invalid id");
        done();
      });
  });
});


// / test for GET /Should get all loan applications
describe("PATCH api/v2/loans/6.8", () => {
  it("should return an error if something goes wrong", done => {
    chai
      .request(app)
      .patch("/api/v2/loans/6.8")
      .set("token", loggedInUserToken)
      .send({status:"approved"})
      .end((err, res) => {
        if (err) done();
        const body = res.body;
        expect(body).to.be.an("object");
        expect(body.status).to.be.a("number");
        expect(body.status).to.be.equals(400);
        expect(body.error).to.be.an("string");
        expect(body.error).to.be.equal("Something went wrong, try again");
        done();
      });
  });
});

