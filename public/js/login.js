$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const loginBtn = $("#login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginBtn.on("click", event => {
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      handleLoginErr({ message: 'Missing values for required fields' });
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    clearError();

    $.post("/api/v1/auth/login", {
      email: email,
      password: password
    })
      .then(data => {
        console.log("loginUser", data);
        emailInput.val("");
        passwordInput.val("");
        window.location.replace("/where2go");
        // If there's an error, log the error
      })
      .catch(err => {
        handleLoginErr(err.responseJSON)
      });
  }

  // Show error on the red box
  function handleLoginErr(err) {
    console.log('showing error: ', err);
    $("#alert .msg").text(err.message);
    $("#alert").fadeIn(500);
  }

  // Clear red box of error
  function clearError() {
    $("#alert .msg").text('');
    $("#alert").fadeOut(500);
  }
});
