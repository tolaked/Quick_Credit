const feedbackContainer = document.querySelector(".feedback-message");
const loanDetailsFedback = document.querySelector(".feed");

let loanIDD;
// const checkExpiredToken = responseBody => {
//   if (responseBody.error.expiredAt) {
//     // Redirect user to home page
//     setTimeout(() => {
//       window.location.href = "sign-in.html";
//     }, 1000);
//   }
// };

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
          allLoans += `<div class="eachLoan">
          <article>
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
                  <div class="${userLoan.id}" id="acctti">View application</div>
                <hr>
                </div>`;
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

const checkExpiredToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const loanDetailss = e => {
  e.preventDefault();
  if (e.target.id === "acctti") {
    // All loans endpoint url
    let loanID;
    // if(e.target.className !)
    loanID = e.target.className;
    console.log(loanID);

    const detailsurl = `https://my-quick-credit-app.herokuapp.com/api/v2/loans/${loanID}`;

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
        console.log(body);
        // hideOverlay();
        if (body.status === 200) {
          let loandetailss = "";
          loandetailss += ` <article>
          <p>Client's email</p>
          <p>${body.data.clientemail}</p>
        </article>
        <article  id="${body.data.id}" value="${body.data.id}">
                <p>loan id</p>
                <p>${body.data.id}</p>
              </article>
        <article>
                <p>Amount</p>
                <p>&#8358;${body.data.amount}</p>
              </article>
        <article>
          <p>Tenor</p>
          <p>${body.data.tenor}</p>
        </article>
        <article>
          <p>Balance</p>
          <p>&#8358;${body.data.balance}</p>
        </article>
        <article>
            <p>Interest</p>
            <p>${body.data.interest}</p>
          </article>
          <article>
              <p>Payment Installment</p>
              <p>&#8358;${body.data.paymentinstallment}</p>
            </article>
        <article class ="buttons">
          <p>Status</p>
          <p>${body.data.status}</p>
        </article>
        <article >
                <button class="ref" id="approv">Approve</button>
                <button class="ref" id="reject">Reject</button>
              </article>`;

          // get loan container
          const getFulldetails = document.querySelector(".fulldetails");

          // Display all loan record
          getFulldetails.innerHTML = loandetailss;

          console.log(getFulldetails);
        } else {
          loanDetailsFedback.innerHTML = "nothing";
          // feedbackContainer.classList.add("feedback-message-error");
        }
        // console.log(loandetails);
      })
      .catch(err => err);
  }
};
getAllApplications();
document.addEventListener("click", loanDetailss);
