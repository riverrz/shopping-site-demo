const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.redirect("/login");
      }
      // validate password
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.redirect("/login");
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save(err => {
            if (err) {
              console.log(err);
            }
            res.redirect("/");
          });
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hash => {
          const user = new User({
            email,
            password: hash,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(console.log);
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};
