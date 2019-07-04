const feedbackContainer = document.querySelector(".feedback-message");

const checkExpiredToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const displayFeedback = responseData => {
  feedbackContainer.innerHTML = `<li class='feedback-list-item'>${
    responseData.error
  }</li>`;
  feedbackContainer.classList.add("feedback-message-error");
  window.scrollTo(0, 0);
};

/**
 * Fetch all loan applications
 */
const getAllApplications = () => {
  // All loans endpoint url
  const url = "https://my-quick-credit-app.herokuapp.com/api/v2/loans";

  let userToken;
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    userToken = token;
  }

  // make a GET request to meetups
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: userToken
    }
  })
    .then(res => res.json())
    .then(body => {
      // hideOverlay();
      if (body.status === 200) {
        feedbackContainer.classList.remove("feedback-message-error");
        let allLoans = "";
        body.data.forEach(userLoan => {
          allLoans += `<article>
              <p>Client's Email</p>
              <p>${userLoan.clientemail}</p>
            </article>
            <article>
                <p>Loan Amount</p>
                <p>&#8358; ${userLoan.amount}</p>
              </article>
            <article>
              <p>Status</p>
              <p>${userLoan.status}</p>
            </article>
                <article class ="buttons">
                    
                  </article>
                  <div class="acctt"><a class="acctt" href="loan.html">View Application</a></div>
                <hr>`;
        });

        // get loan container
        const allLoansContainer = document.getElementById("viewLoans");

        // Display all loan record
        allLoansContainer.innerHTML = allLoans;
      } else {
        displayFeedback(body);
      }
    })
    .catch(err => err);
};

const loanDetails = e => {
  // All loans endpoint url
  const detailsurl = "https://my-quick-credit-app.herokuapp.com/api/v2/loans";

  let detailsToken;
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    detailsToken = token;
  }

  // make a GET request to meetups
  fetch(detailsurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: detailsToken
    }
  })
    .then(res => res.json())
    .then(body => {
      // hideOverlay();
      let loandetails = "";
      body.data.forEach(getdetails => {
        loandetails += ` <article>
          <p>Client's email</p>
          <p>${getdetails.clientemail}</p>
        </article>
        <article  id="${getdetails.id}" value="${getdetails.id}">
                <p>loan id</p>
                <p>${getdetails.id}</p>
              </article>
        <article>
                <p>Amount</p>
                <p>&#8358;${getdetails.amount}</p>
              </article>
        <article>
          <p>Tenor</p>
          <p>${getdetails.tenor}</p>
        </article>
        <article>
          <p>Balance</p>
          <p>&#8358;${getdetails.balance}</p>
        </article>
        <article>
            <p>Interest</p>
            <p>${getdetails.interest}</p>
          </article>
          <article>
              <p>Payment Installment</p>
              <p>&#8358;${getdetails.paymentinstallment}</p>
            </article>
        <article class ="buttons">
          <p>Status</p>
          <p>${getdetails.status}</p>
        </article>
        <article >
                <button class="ref" id="approv">Approve</button>
                <button class="ref" id="reject">Reject</button>
              </article>`;
      });

      // get loan container

      const getFulldetails = document.getElementById("fulldetails");

      // Display all loan record
      getFulldetails.innerHTML = loandetails;
    })
    .catch(err => err);
};

// fetch all loan record
getAllApplications();
loanDetails();
