const feedContainrs = document.querySelector(".feed");

const checkedToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const feedbak = responseData => {
  feedContainrs.innerHTML = `<li class='feedback-list-item'>${
    responseData.error
  }</li>`;
  feedContainrs.classList.add("feedback-message-error");
  window.scrollTo(0, 0);
};

const verifyLoan = e => {
  e.preventDefault();

  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    usersToken = token;
  } else {
    window.location.href = "sign-in.html";
  }

  let formData;
  const allinputs = document.querySelectorAll(".ref");
  for (let i = 0; i < allinputs.length; i++) {
    if (allinputs[i].value === "approved") {
      formData = { status: "approved" };
    } else {
      formData = { status: "rejected" };
    }
  }
  const loanid = `document.getElementById("${getdetails.id}").value`;

  const url = `https://my-quick-credit-app.herokuapp.com/api/v2/loans/${loanid}`;

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: usersToken
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(body => {
      if (body.status === 200) {
        feedContainrs.innerHTML = `Loan with the id ${
          getdetails.id
        } has been approved successfully`;
        feedContainrs.classList.add("feedback-message-success");

        feedContainrs.classList.remove("feedback-message-error");
      } else {
        feedbak(body);
      }
    })
    .catch(err => err);
};

const approveBtn = document.getElementById("approv");
const rejectBtn = document.getElementById("reject");

approveBtn.addEventListener("click", verifyLoan);
rejectBtn.addEventListener("click", verifyLoan);
