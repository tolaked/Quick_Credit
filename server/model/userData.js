let models =
{
     Users: [
    {
      id: 1,
      email: 'firstuser@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Sweetmum',
      Status:'Verified',
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
        Status:'Verified',
        Address: '21,Okusaga Street, Ilupeju',
        isAdmin: false,
        createdOn: '2019-04-21T17:11:37.631Z',
          modifiedOn: '2019-04-21T17:00:47.096Z'
      },
      {
        id: 4,
        email: 'biola@gmail.com',
        firstName: 'Adetolaasd',
        lastName: 'Akerele',
        password: 'Sweetmum',
        Status:'Verified',
        Address: '21,Okusaga Street, Ilupeju',
        isAdmin: false,
        createdOn: '2019-04-21T17:11:37.631Z',
          modifiedOn: '2019-04-21T17:00:47.096Z'
      },

      {id:5,
      email: 'dimeji@gmail.com',
      firstName: 'Dimeji',
      lastName: 'Akere',
      password: 'Sweetmum',
      Status:'unverified',
      Address: '20,okusaga',
      isAdmin: false,
      createdOn: '2019-04-21T17:11:37.631Z',
        modifiedOn: '2019-04-21T17:00:47.096Z'
      },
      {
        id:6,
      email: 'seun@gmail.com',
      firstName: 'Dimeji',
      lastName: 'Akere',
      password: '$2a$10$yd1/RwcpZRXiy6i2zuoAE.tyHWnA9vtAVrQGgFgJNExhu/RsY5VFu',
      Status:'Verified',
      Address: '20,okusaga',
      isAdmin: true,
      createdOn: '2019-04-22T11:26:27.010Z',
      modifiedOn: '2019-04-22T11:26:27.011Z'
      }

  ],
  Loans:[{
    user: "firstuser@gmail.com",
        createdOn: "2019-04-22T14:34:25.265Z",
        status: "pending",
        repaid: false,
        tenor: 3,
        amount: 400000,
        paymentInstallment: 140000,
        balance: 420000,
        interest: 20000
  }

  ]
};

export default models;