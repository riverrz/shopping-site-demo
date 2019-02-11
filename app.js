const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./keys/keys");
const User = require("./models/user");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5c617e33d3e7fa353bb105ce")
    .then(user => {
      // user is full model with methods
      req.user = user;
      next();
    })
    .catch(console.log);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(keys.MONGO_URI)
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: "Shivam",
            email: "shivam@test.com",
            cart: {
              items: []
            }
          });
          return user.save();
        }
        return user;
      })
      .then(user => {
        app.listen(3000, () => {
          console.log("Server has started");
        });
      })
      .catch(console.log);
  })
  .catch(console.log);
