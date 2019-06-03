// Clear all errors from field
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

  if (responseData.status === 422 && typeof responseData.error !== "string") {
    listItem +=
      "<li class='feedback-list-item'>Please Fill all required fields.</li>";
  } else if (responseData.status === 200 || responseData.status === 201) {
    listItem += `<li class='feedback-list-item'>${
      responseData.data[0].message
    }</li>`;
  } else {
    listItem += `<li class='feedback-list-item'>${responseData.error}</li>`;
  }

  return listItem;
};

const signIn = e => {
  e.preventDefault();

  resetFields();

  // showOverlay();

  // get form data
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  const feedbackContainer = document.querySelector(".feedback-message");

  const url = "https://my-quick-credit-app.herokuapp.com/api/v2/auth/signin";

  const formData = {
    email: userEmail,
    password: userPassword
  };
  // make post request to sign in route
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(body => {
      // check for success status
      if (body.status === 200) {
        // store user data in browser local storage
        const userData = JSON.stringify({
          username: body.data[0].user.lastname,
          token: body.data[0].token,
          access: body.data[0].user.iAdmin
        });
        const loggedInUser = body.data[0].user.lastname;
        localStorage.setItem("user", userData);

        feedbackContainer.innerHTML = `Welcome ${loggedInUser}`;
        feedbackContainer.classList.remove("feedback-message-error");
        feedbackContainer.classList.add("feedback-message-success");
        window.scrollTo(0, 0);

        // redirect user to dashboard after 2 seconds
        if (body.data[0].user.isAdmin) {
          setTimeout(() => {
            window.location.href = "admin.html";
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = "user.html";
          }, 2000);
        }
      } else {
        feedbackContainer.innerHTML = "Plese enter valid login details";
        feedbackContainer.classList.add("feedback-message-error");
        window.scrollTo(0, 0);
      }
    })
    .catch(err => err);
};

const signInBtn = document.getElementById("submit-login");

// bind click event to sign in button
signInBtn.addEventListener("click", signIn);
