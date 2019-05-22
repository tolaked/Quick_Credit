const displayFeedbackLogin = responseData => {
  let listItem = "";

  if (responseData.status === 422 && typeof responseData.error !== "string") {
    listItem +=
      "<li class='feedback-list-item'>Please fill the required field below.</li>";
  } else if (responseData.status === 200 || responseData.status === 201) {
    listItem += "<li class='feedback-list-item'>Login Successful</li>";
  } else {
    listItem += `<li class='feedback-list-item'>${responseData.error}</li>`;
  }

  return listItem;
};

const signUp = e => {
  e.preventDefault();
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
    feedbackContainer2.innerHTML = "comfirm password does not match";
    feedbackContainer2.style.color = "red";
    feedbackContainer2.style.border = "0.7px solid #dc3545";

    setInterval(() => {
      feedbackContainer2.innerHTML = "";
      feedbackContainer2.style.border = "none";
    }, 5000);
    // hideSpinner(e);
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

    console.log(formData);

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
        console.log(body);

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

          // redirect user to dashboard after 2 seconds
          window.location.href = "admin.html";
        } else {
          feedbackContainer.innerHTML = displayFeedback(body);
          feedbackContainer.classList.add("feedback-message-error");
          window.scrollTo(0, 0);
        }
      })
      .catch(err => err);
  }
};

// Get sign up button
const signupbtn = document.getElementById("submit");

// bind click event to sign up button
signupbtn.addEventListener("click", signUp);
