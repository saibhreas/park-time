$(document).ready(() => {
  // Getting references to our form and input
  const signUpBtn = $("#sign-up");
  const nameInput = $("input#name-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");


  // When the signup button is clicked, we validate the email and password are not blank

  signUpBtn.on("click", event => {
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.password) {
      handleLoginErr({ message: 'Missing values for required fields' });
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    clearError();

    $.post("/api/v1/auth/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(data => {
        console.log("signUpUser", data);
        // Empty out form fields only if request is succesful
        nameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        window.location.replace("/where2go");
      })
      .catch(err => handleLoginErr(err.responseJSON));
  }

  // Show error on the red box
  function handleLoginErr(err) {
    $("#alert .msg").text(err.message);
    $("#alert").fadeIn(500);
  }

  // Clear red box of error
  function clearError() {
    $("#alert .msg").text('');
    $("#alert").fadeOut(500);
  }
});
