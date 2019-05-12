let models = {
  Users: [
    {
      id: 1,
      email: "firstuser@gmail.com",
      firstName: "John",
      lastName: "Doe",
      password: "$2a$10$gEwkPvCIWRAzwhbMG3WPju0QxCOsqznvaw9h3nAFBug9cidLfeNMq",
      status: "verified",
      Address: "20,client",
      isAdmin: false,
      createdOn: "2019-04-21T17:00:47.094Z",
      modifiedOn: "2019-04-21T17:00:47.096Z"
    },
    {
      id: 4,
      email: "alaksol@yahoo.com",
      firstName: "Adetolaasd",
      lastName: "Akerele",
      password: "Sweetmum",
      status: "verified",
      Address: "21,Okusaga Street, Ilupeju",
      isAdmin: false,
      createdOn: "2019-04-21T17:11:37.631Z",
      modifiedOn: "2019-04-21T17:00:47.096Z"
    },

    {
      id: 6,
      email: "dimeji@gmail.com",
      firstName: "Dimeji",
      lastName: "Akere",
      password: "Sweetmum",
      Status: "unverified",
      Address: "20,okusaga",
      isAdmin: false,
      createdOn: "2019-04-21T17:11:37.631Z",
      modifiedOn: "2019-04-21T17:00:47.096Z"
    },
    {
      id: 7,
      email: "bayomi@gmail.com",
      firstName: "suly",
      lastName: "bayo",
      password: "$2a$10$yUHclZyx9saFA7JX7bCr1u4OVnS4Z2i5JvzZexHRK/0SxKDgWoCbO",
      status: "verified",
      Address: "20,okusaga",
      isAdmin: true,
      createdOn: "2019-04-22T11:26:27.010Z",
      modifiedOn: "2019-04-22T11:26:27.011Z"
    },
    {
      id: 8,
      email: "bimpe@gmail.com",
      firstName: "peter",
      lastName: "segun",
      password: "$2a$10$mcDT.GKu8q2zP8lSOlg9TeccXaiEfPTUXKqa44GgfQpK3R.GrK11C",
      status: "unverified",
      Address: "20,okusaga",
      isAdmin: true,
      createdOn: "2019-05-04T17:11:15.781Z",
      modifiedOn: "2019-05-04T17:11:15.784Z"
    },
    {
      id: 9,
      email: "bimp@gmail.com",
      firstName: "peter",
      lastName: "segun",
      password: "$2a$10$L0F2UisejZ/WhA1ad4Z/MOCNLMljNmk2RdYe3eaIuL7vHtgxwORc.",
      status: "verified",
      Address: "20,okusaga",
      isAdmin: true,
      createdOn: "2019-05-04T17:20:52.545Z",
      modifiedOn: "2019-05-04T17:20:52.546Z"
    },
    {
      id: 10,
      email: "khalid@gmail.com",
      firstName: "peter",
      lastName: "segun",
      password: "$2a$10$bvHa7pGEVX/TRJs6IAAW2e1iO2sUmQ59tab4Cv9Xv4cB/KnJ6G6WS",
      status: "verified",
      Address: "20,okusaga",
      isAdmin: true,
      createdOn: "2019-05-04T17:29:01.804Z",
      modifiedOn: "2019-05-04T17:29:01.808Z"
    },
    {
      id: 10,
      email: "bolaji@gmail.com",
      firstName: "peter",
      lastName: "segun",
      password: "$2a$10$bvHa7pGEVX/TRJs6IAAW2e1iO2sUmQ59tab4Cv9Xv4cB/KnJ6G6WS",
      status: "verified",
      Address: "20,okusaga",
      isAdmin: true,
      createdOn: "2019-05-04T17:29:01.804Z",
      modifiedOn: "2019-05-04T17:29:01.808Z"
    }
  ],
  Loans: [
    {
      id: 1,
      user: "bayomi@gmail.com",
      createdOn: "2019-04-22T14:34:25.265Z",
      status: "pending",
      repaid: false,
      tenor: 3,
      amount: 400000,
      paymentInstallment: 140000,
      balance: 420000,
      interest: 20000
    },
    {
      id: 2,
      user: "bayomi@gmail.com",
      createdOn: "2019-04-22T14:34:25.265Z",
      status: "pending",
      repaid: true,
      tenor: 3,
      amount: 800000,
      paymentInstallment: 280000,
      balance: 840000,
      interest: 40000
    },
    {
      id: 3,
      user: "firstuser@gmail.com",
      createdOn: "2019-04-24T09:38:09.085Z",
      status: "approved",
      repaid: true,
      tenor: 5,
      amount: 700000,
      paymentInstallment: 147000,
      balance: 735000,
      interest: 35000
    },
    {
      id: 4,
      user: "firstuser@gmail.com",
      createdOn: "2019-04-24T23:43:10.644Z",
      status: "approved",
      repaid: false,
      tenor: 5,
      amount: 600000,
      paymentInstallment: 210000,
      balance: 630000,
      interest: 30000
    },
    {
      id: 5,
      user: "khalid@gmail.com",
      createdOn: "2019-05-04T17:37:33.736Z",
      status: "approved",
      repaid: true,
      tenor: 6,
      amount: 7500000,
      paymentInstallment: 1312500,
      balance: 0,
      interest: 375000
    },
    {
      id: 6,
      user: "khalid@gmail.com",
      createdOn: "2019-05-04T17:37:33.736Z",
      status: "approved",
      repaid: false,
      tenor: 6,
      amount: 7500000,
      paymentInstallment: 1312500,
      balance: 690000,
      interest: 375000
    }
  ],
  Repayment: [
    {
      id: 1,
      loanId: 1,
      user: "firstuser@gmail.com",
      createdOn: "2019-04-24T23:43:10.644Z",
      repaid: false,
      tenor: 5,
      amount: 600000,
      monthlyInstallment: 210000,
      balance: 630000,
      interest: 30000,
      paidAmount: 5000
    }
  ]
};

export default models;
