const loanDetailsFedback = document.querySelector(".feed");

const loanID = elementNodeReference.className;
// elementNodeReference.className = loanID;

const checkExpiredToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const loanDetails = () => {
  console.log(loanID);
  // All loans endpoint url
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
      // hideOverlay();
      if (body.status === 200) {
        let loandetails = "";
        loandetails += ` <article>
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
        const getFulldetails = document.getElementById("fulldetails");

        // Display all loan record
        getFulldetails.innerHTML = loandetails;
      } else {
        loanDetailsFedback.innerHTML = "nothing";
        feedbackContainer.classList.add("feedback-message-error");
      }
    })
    .catch(err => err);
};

loanDetails();
