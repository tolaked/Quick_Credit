const feedbackContainers = document.querySelector(".feedback-messages");

const checkToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const displayFeedback = responseData => {
  feedbackContainers.innerHTML = `<li class='feedback-list-item'>${
    responseData.error
  }</li>`;
  feedbackContainers.classList.add("feedback-message-error");
  window.scrollTo(0, 0);
};

/**
 * Fetch all loan applications
 */
const unrepaidLoans = () => {
  // All loans endpoint url
  const url =
    "https://my-quick-credit-app.herokuapp.com/api/v2/loans?status=approved&repaid=false";

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
        feedbackContainers.classList.remove("feedback-message-error");
        let outstandingLoan = "";
        body.data.forEach(debt => {
          outstandingLoan += `<article>
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
          <p>&#8358;${debt.paymentinstallment}/p>
        </article><hr>`;
        });

        // get loan container
        const allLoansContainer = document.getElementById("notpaid");

        // Display all loan record
        allLoansContainer.innerHTML = outstandingLoan;
      } else {
        displayFeedback(body);
      }
    })
    .catch(err => err);
};

// fetch all loan record
unrepaidLoans();
