const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
//only 2 parameters (userNameField: set to email) && callback fun tion (email, password, done)
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    (email, password, done) => {
      console.log("Password authentication")
      // When a user tries to sign in this code runs
      db.User.findOne({//means we are suing model
        where: {
          email: email
        }
      }).then(dbUser => {
        // If there's no user with the given email
        console.log("passport - dbUser:", dbUser.get({ plain: true }));
        console.log('password:', password)
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        } else if (!dbUser.checkPassword(password)) {
          // If there is a user with the given email, but the password the user gives us is incorrect
          console.log('incorrect pass')
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        console.log("passport authenticate - passed");
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  console.log("passport.serializeUser");

  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  console.log("passport.deserializeUser");

  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
