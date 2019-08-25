const showOverlay = e => {
  if (
    e.target.className === "signuptit" ||
    e.target.className === "registerbtn"
  ) {
    document.querySelector(".signuptit").innerHTML = "Loading ...";
    document.querySelector(".signuptit").style.display = "inline-block";
    document.querySelector(".registerbtn").disabled = true;

    document.getElementById("spinbtn2").style.display = "inline-block";

    document.getElementById("submit").style.backgroundColor = "#ddd";
  }
};

const hideSpinner = e => {
  if (
    e.target.className === "signuptit" ||
    e.target.className === "registerbtn"
  ) {
    document.getElementById("spinbtn2").style.display = "none";
    document.querySelector(".signuptit").innerHTML = "Sign up";
    document.querySelector(".registerbtn").disabled = false;

    document.getElementById("submit").style.backgroundColor = "#6272b8";
  }
};

// Clear all errors from field
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

const signUp = e => {
  e.preventDefault();
  showOverlay(e);
  // get all user input values
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("confirm-password").value;
  const feedbackContainer = document.querySelector(".feedback_container");
  const feedbackContainer2 = document.querySelector(".feedback_container2");

  feedbackContainer.innerHTML = "";

  if (password !== password2) {
    feedbackContainer2.innerHTML = "password does not match";
    feedbackContainer2.style.color = "red";
    feedbackContainer2.style.border = "0.7px solid #dc3545";

    setInterval(() => {
      feedbackContainer2.innerHTML = "";
      feedbackContainer2.style.border = "none";
    }, 5000);
    hideSpinner(e);
  } else {
    feedbackContainer2.innerHTML = "";
    feedbackContainer2.style.border = "none";
    // sign up API-endpoint url
    const url = "https://my-quick-credit-app.herokuapp.com/api/v2/auth/signup";

    // User input data object
    const formData = {
      firstname,
      lastname,
      email,
      password,
      address
    };

    // Make a post request to sign up endpoint
    fetch(
      url,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )
      .then(res => res.json())
      .then(body => {
        hideSpinner(e);
        // check for success status

        if (body.status === 201) {
          // store user data in browser local storage
          const userData = JSON.stringify({
            id: body.data.newUser.id,
            username: body.data.newUser.lastName,
            token: body.data.token
          });

          localStorage.setItem("user", userData);

          feedbackContainer.innerHTML = "welcome";
          feedbackContainer.classList.remove("feedback-message-error");
          feedbackContainer.classList.add("feedback-message-success");
          window.scrollTo(0, 0);

          // redirect user to dashboard
          if (body.data.newUser.isAdmin) {
            setTimeout(() => {
              window.location.href = "admin.html";
            }, 2000);
            // hideSpinner(e);
          }
          setTimeout(() => {
            window.location.href = "user.html";
          }, 1000);
        } else {
          feedbackContainer.innerHTML = displayFeedback(body);
          feedbackContainer.classList.add("feedback-message-error");
          body.error.forEach(element => {
            Object.keys(formData).forEach(key => {
              if (element.key === key) {
                document.querySelector(`.${element.key}`).style.border =
                  "0.7px solid #dc3545";
                document.querySelector(
                  `.${element.key}`
                ).nextElementSibling.innerHTML = element.Rule;
              }
            });
          });
        }
      })

      .catch(err => err);
  }
};

// Get sign up button
const signupbtn = document.getElementById("submit");

// bind click event to sign up button
signupbtn.addEventListener("click", signUp);
