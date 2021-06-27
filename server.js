// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection");
const routes = require("./controller");
const axios = require('axios').default;

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());          

// *! everything in the public folder will use an absolute 
// *! path which is why you can use /assets
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// require("./controller/html-routes.js")(app);//change to our routes
// require("./controller/.js")(app);

app.use(routes);
// Syncing our database and logging a message to the user upon success
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
