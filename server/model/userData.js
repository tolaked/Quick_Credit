let models =
{
  Users: [
    {
      id: 1,
      email: 'firstuser@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '$2a$10$gEwkPvCIWRAzwhbMG3WPju0QxCOsqznvaw9h3nAFBug9cidLfeNMq',
      status: 'verified',
      Address: '20,client',
      isAdmin: false,
      createdOn: '2019-04-21T17:00:47.094Z',
      modifiedOn: '2019-04-21T17:00:47.096Z'
    },
    {
      id: 4,
      email: 'alaksol@yahoo.com',
      firstName: 'Adetolaasd',
      lastName: 'Akerele',
      password: 'Sweetmum',
      status: 'verified',
      Address: '21,Okusaga Street, Ilupeju',
      isAdmin: false,
      createdOn: '2019-04-21T17:11:37.631Z',
      modifiedOn: '2019-04-21T17:00:47.096Z'
    },


    {
      id: 6,
      email: 'dimeji@gmail.com',
      firstName: 'Dimeji',
      lastName: 'Akere',
      password: 'Sweetmum',
      Status: 'unverified',
      Address: '20,okusaga',
      isAdmin: false,
      createdOn: '2019-04-21T17:11:37.631Z',
      modifiedOn: '2019-04-21T17:00:47.096Z'
    },
    {
      id: 7,
      email: 'bayomi@gmail.com',
      firstName: 'suly',
      lastName: 'bayo',
      password: '$2a$10$yUHclZyx9saFA7JX7bCr1u4OVnS4Z2i5JvzZexHRK/0SxKDgWoCbO',
      status: 'verified',
      Address: '20,okusaga',
      isAdmin: true,
      createdOn: '2019-04-22T11:26:27.010Z',
      modifiedOn: '2019-04-22T11:26:27.011Z'
    },


  ],
  Loans: [{
    id: 1,
    user: "firstuser@gmail.com",
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
    user: "seun@gmail.com",
    createdOn: "2019-04-22T14:34:25.265Z",
    status: "approved",
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
        status: "pending",
        repaid: false,
        tenor: 5,
        amount: 700000,
        paymentInstallment: 147000,
        balance: 735000,
        interest: 35000
  }

  ]
};

export default models;