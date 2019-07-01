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
                <br>`;
          console.log(allLoans);
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

// fetch all loan record
getAllApplications();
