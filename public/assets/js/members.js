$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/v1/login.html").then(data => {
    let userName = $("#name-input").val();
    let userEmail = $('#email-input').val();
    let userPassword = $("#password-input");

    console.log("get : " + userName + " " + userEmail + " " + userPassword);

  });
});
