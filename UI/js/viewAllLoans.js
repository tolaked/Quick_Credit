const feedbackContainer = document.querySelector(".feedback-message");

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

  // make a GET request to meetups
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(body => {
      hideOverlay();
      if (body.status === 200) {
        feedbackContainer.classList.remove("feedback-message-error");
        let allLoans = "";
        body.data.forEach(userLoan => {
          allLoans += `<div class="clientloanss">
          <article>
              <p>Client's Email</p>
              <p>${userLoan.email}</p>
            </article>
            <article>
                <p>Loan Amount</p>
                <p>&#8358; ${userLoan.amount}</p>
              </article>
            <article>
              <p>Application Date</p>
              <p ${userLoan.createdon}></p>
            </article>
                <article class ="buttons">
                    
                  </article>
                  <div class="acctt"><a class="acctt" href="loan.html">View Application</a></div>
                </div>
                <br>`;
        });

        // get loan container
        const allLoansContainer = document.getElementById("clientloanss");

        // Display all loan record
        allLoansContainer.innerHTML = allLoans;
      } else {
        displayFeedback(body);
      }
    })
    .catch(err => err);
};

// fetch all loan record
getAllApplications();
