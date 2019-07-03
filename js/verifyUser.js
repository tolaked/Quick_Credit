const feedContainers = document.querySelector(".feed");

const checkToken = responseBody => {
  if (responseBody.error.expiredAt) {
    // Redirect user to home page
    setTimeout(() => {
      window.location.href = "sign-in.html";
    }, 1000);
  }
};

const feedbak = responseData => {
  feedContainers.innerHTML = `<li class='feedback-list-item'>${
    responseData.error
  }</li>`;
  feedContainers.classList.add("feedback-message-error");
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
  }
  const verif = document.querySelector(".userStatus").value;
  const formData = {
    verificationStatus: verif.options[verif.selectedIndex].text
  };

  const userEmail = document.getElementById("email").value;
  console.log(userEmail);

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
        feedContainers.innerHTML = `User with the email ${userEmail} verified successfully`;
      } else {
        feedbak(body);
      }
    })
    .catch(err => err);
};

const verifyBtn = document.querySelector(".add-loan-button");
verifyBtn.addEventListener("click", verifyUser);
