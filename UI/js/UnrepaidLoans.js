const feedbackContainers = document.querySelector(".feedback-messages");

const checkToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const feedback = responseData => {
  feedbackContainers.innerHTML = `<li class='feedback-list-item'>${
    responseData.error
  }</li>`;
  feedbackContainers.classList.add("feedback-message-error");
  window.scrollTo(0, 0);
};

/**
 * Fetch all pending loan applications
 */
const unrepaidLoans = () => {
  // All loans endpoint url
  const urlpath =
    "https://my-quick-credit-app.herokuapp.com/api/v2/loans?status=approved&repaid=false";

  let useToken;
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    useToken = token;
  } else {
    window.location.href = "sign-in.html";
  }
  // make a GET request to meetups
  fetch(urlpath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: useToken
    }
  })
    .then(res => res.json())
    .then(body => {
      // hideOverlay();
      if (body.status === 200) {
        feedbackContainers.classList.remove("feedback-message-error");
        let outstandingLoan = "";
        body.data.forEach(debt => {
          outstandingLoan += `
          <div class="eachLoan">
          <article>
          <p>Client's Email</p>
          <p>${debt.clientemail}</p>
        </article>
          <article>
              <p>Loan id</p>
              <p>${debt.id}</p>
            </article>
        <article>
            <p>Loan Amount</p>
            <p>&#8358;${debt.amount}</p>
          </article>
        
    <article>
      <p>Tenor</p>
      <p>${debt.tenor}</p>
    </article>
    
    <article>
      <p>Balance</p>
      <p>&#8358;${debt.balance}</p>
    </article>
    <article>
        <p>Interest</p>
        <p>${debt.interest}</p>
      </article>
      <article>
          <p>Payment Installment</p>
          <p>&#8358;${debt.paymentinstallment}</p>
        </article>
        </div>`;
        });

        // get loan container
        const allunrepaidContainer = document.getElementById("notpaid");

        // Display all loan record
        allunrepaidContainer.innerHTML = outstandingLoan;
      } else {
        feedback(body);
      }
    })
    .catch(err => err);
};

unrepaidLoans();
/**
 * Fetch all repaid loans
 */
const repaidLoans = () => {
  // All loans endpoint url
  const link =
    "https://my-quick-credit-app.herokuapp.com/api/v2/loans?status=approved&repaid=true";

  let adminToken;
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    adminToken = token;
  }

  // make a GET request to meetups
  fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: adminToken
    }
  })
    .then(res => res.json())
    .then(body => {
      // hideOverlay();
      if (body.status === 200) {
        feedbackContainers.classList.remove("feedback-message-error");
        let settledLoans = "";
        body.data.forEach(paidLoan => {
          settledLoans += `<div class="eachLoan">
          <article>
          <p>Client's Email</p>
          <p>${paidLoan.clientemail}</p>
        </article>
          <article>
              <p>Loan id</p>
              <p>${paidLoan.id}</p>
            </article>
        <article>
            <p>Loan Amount</p>
            <p>&#8358;${paidLoan.amount}</p>
          </article>
        
    <article>
      <p>Tenor</p>
      <p>${paidLoan.tenor}</p>
    </article>
    
    <article>
      <p>Balance</p>
      <p>&#8358;${paidLoan.balance}</p>
    </article>
    <article>
        <p>Interest</p>
        <p>${paidLoan.interest}</p>
      </article>
      <article>
          <p>Payment Installment</p>
          <p>&#8358;${paidLoan.paymentinstallment}</p>
        </article></div>`;
        });

        // get loan container
        const allrepaidContainer = document.getElementById("clientloanss");

        // Display all loan record
        allrepaidContainer.innerHTML = settledLoans;
      } else {
        feedback(body);
      }
    })
    .catch(err => err);
};

// fetch all loan record
repaidLoans();
