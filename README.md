# Quick_Credit

Quick Credit is an online lending platform that provides short term soft loans to individuals.
This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

[![Build Status](https://travis-ci.org/tolaked/Quick_Credit.svg?branch=develop)](https://travis-ci.org/tolaked/Quick_Credit)
[![Coverage Status](https://coveralls.io/repos/github/tolaked/Quick_Credit/badge.svg?branch=develop)](https://coveralls.io/github/tolaked/Quick_Credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b61b0791bc837243645e/maintainability)](https://codeclimate.com/github/tolaked/Quick_Credit/maintainability)

## Required Features

- User can sign up
- User can sign in
- Users can **apply for a loan**
- Users can **view loan repayment history**
- Admin can **Admin can mark a client as verified after confirming the client’s work or home  addres**
- Admin can **view all loan applications**
- Admin can **view a specific loan application**
- Admin can **view current loans (not fully repaid)**
- Admin can **view all repaid loan**
- Admin can **approve or reject a client’s loan application**
- Admin can **post loan repayment transaction in favour of a client**

## Technologies

- Node JS
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node Js
- Git

To run:

```sh
git clone <https://github.com/tolaked/Quick_Credit>
cd EPIC_Mail
npm install
npm start
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

**V1**

`- POST /api/v1/auth/signup Create a new user.`

`- POST /api/v1/auth/login Login a user.`

`- POST /api/v1/auth/loans Create a loan application.`

`- GET /api/v1/auth/loans/<:id>/repayments Get loan repayment history.`

`- PATCH /api/v1/users/<:email>/verify Mark a user as verified.`

`- GET /api/v1/loans/<:id> View specific loan by id.`

`- GET /api/v1/loans?status=approved&repaid=fals Get loan repayment status.`

`- GET /api/v1/loans Get all loans.`

`- PATCH /api/v1/loans/<:id>" Approve or reject a loan application.`

`- POST /api/v1/loans/<:id>/repayment" Post loan repayment transaction in favour of a client.`

**V2**

`- POST /api/v2/auth/signup Create a new user.`

`- POST /api/v2/auth/login Login a user.`

`- POST /api/v2/auth/loans Create a loan application.`

`- GET /api/v2/auth/loans/<:id>/repayments Get loan repayment history.`

`- PATCH /api/v2/users/<:email>/verify Mark a user as verified.`

`- GET /api/v2/loans/<:id> View specific loan by id.`

`- GET /api/v2/loans?status=approved&repaid=fals Get loan repayment status.`

`- GET /api/v2/loans Get all loans.`

`- PATCH /api/v2/loans/<:id>" Approve or reject a loan application.`

`- POST /api/v2/loans/<:id>/repayment" Post loan repayment transaction in favour of a client.`

## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2326850](https://www.pivotaltracker.com/n/projects/2326850)

## Template UI

You can see a hosted version of the template at [https://tolaked.github.io/Quick_Credit/index.html](https://tolaked.github.io/Quick_Credit/index.html)

### API

The API is currently in version 1 (v2) and is hosted at

[https://my-quick-credit-app.herokuapp.com/signup](https://my-quick-credit-app.herokuapp.com/signup)

## API Documentation

[https://https://my-quick-credit-app.herokuapp.com/api-docs](https://https://my-quick-credit-app.herokuapp.com/api-docs)

## Author

Akere Adetola
