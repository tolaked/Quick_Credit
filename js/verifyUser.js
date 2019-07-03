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

const verifyUser = e => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  // showOverlay();
  let usersToken;
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const { token } = userData;
    usersToken = token;
  } else {
    window.location.href = "sign-in.html";
  }
  console.log(token);

  const formData = {
    status: document.querySelector(".newStatus").value
  };

  const userEmail = document.getElementById("email").value;

  const url = `https://my-quick-credit-app.herokuapp.com/api/v1/users/${userEmail}/verify`;

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
      // eslint-disable-next-line no-undef
      // hideOverlay();

      if (body.status === 200) {
        feedContainrs.innerHTML = `User with the email ${userEmail} verified successfully`;
      } else {
        feedbak(body);
      }
    })
    .catch(err => err);
};

const verifyBtn = document.querySelector(".add-loan-button");
verifyBtn.addEventListener("click", verifyUser);
