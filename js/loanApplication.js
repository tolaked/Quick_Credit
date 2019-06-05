// check if token has expired
const checkExpiredToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};
// const resetFields = () => {
//   const fields = document.querySelectorAll(".error");
//   const fieldsArr = Array.prototype.slice.call(fields);
//   fieldsArr.forEach(element => {
//     const currentField = element;
//     currentField.innerHTML = "";
//     currentField.previousElementSibling.style.border = "1px solid #f4f4f4";
//   });
// };

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
  // resetFields();

  // get all user input values
  const loanTenor = document.getElementById("tenor").value;
  const loanAmount = document.getElementById("amount").value;
  const feedbackContainer = document.querySelector(".feedback-message");

  // User input data object
  const formData = {
    tenor: parseInt(loanTenor, 10),
    amount: parseFloat(loanAmount)
  };

  // sign up API-endpoint url
  const url = "https://my-quick-credit-app.herokuapp.com/api/v2/loans";

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
      // check for success status
      if (body.status === 201) {
        feedbackContainer.innerHTML = "loan application sent successfully";
        feedbackContainer.classList.remove("feedback-message-error");
        feedbackContainer.classList.add("feedback-message-success");

        // Redirect user to home page
        setTimeout(() => {
          window.location.href = "sign-in.html";
        }, 1000);
      } else {
        feedbackContainer.innerHTML = displayFeedback(body);
        feedbackContainer.classList.add("feedback-message-error");

        // redirect to login if token has expired
        checkExpiredToken(body);
      }
    })
    .catch(err => err);
};

const postLoanBtn = document.getElementById("post-loann");

postLoanBtn.addEventListener("click", postLoanApp);
