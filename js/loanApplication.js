// check if token has expired
const checkExpiredToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};
const resetFields = () => {
  const fields = document.querySelectorAll(".error");
  const fieldsArr = Array.prototype.slice.call(fields);
  fieldsArr.forEach(element => {
    const currentField = element;
    currentField.innerHTML = "";
    currentField.previousElementSibling.style.border = "1px solid #f4f4f4";
  });
};

const displayFeedback = responseData => {
  let listItem = "";

  if (responseData.status === 400 && typeof responseData.error !== "string") {
    if (responseData.error.expiredAt) {
      listItem +=
        "<li class='feedback-list-item'>Session expired, Please Login.</li>";
    } else {
      listItem +=
        "<li class='feedback-list-item'>Please fill the required field below.</li>";
    }
  } else if (responseData.status === 200 || responseData.status === 201) {
    listItem += `<li class='feedback-list-item'>${responseData.message}</li>`;
  } else {
    listItem += `<li class='feedback-list-item'>${responseData.error}</li>`;
  }

  return listItem;
};

const postLoanApp = e => {
  e.preventDefault();
  resetFields();

  // get all user input values
  const loanTenor = document.getElementById("tenor").value;
  const loanAmount = document.getElementById("amount").value;
  const feedbackContainer = document.querySelector(".feedback-message");

  // sign up API-endpoint url
  const url = "https://my-quick-credit-app.herokuapp.com/api/v2/loans";

  // User input data object
  const formData = {
    clientemail: body.data.loan.clientemail,
    createdon: new Date(),
    tenor: parseInt(loanTenor, 12),
    amount: parseInt(loanAmount, 10)
  };

  // get user object from
  let userToken = "";
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;

    userToken = token;
  }

  // Make a post request to sign up endpoint
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: userToken
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(body => {
      hideOverlay();

      // check for success status
      if (body.status === 201) {
        feedbackContainer.innerHTML = "loa application sent successfully";
        feedbackContainer.classList.remove("feedback-message-error");
        feedbackContainer.classList.add("feedback-message-success");
        window.scrollTo(0, 0);

        // Redirect user to home page
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        feedbackContainer.innerHTML = displayFeedback(body);
        feedbackContainer.classList.add("feedback-message-error");
        window.scrollTo(0, 0);

        // redirect to login if token has expired
        checkExpiredToken(body);
      }
    })
    .catch(err => err);
};

const postQuestionBtn = document.getElementById("post-loann");

postQuestionBtn.addEventListener("click", postLoanApp);
