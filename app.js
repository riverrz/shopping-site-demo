const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const keys = require("./keys/keys");
const User = require("./models/user");
const app = express();
const store = new MongoDBStore({
  uri: keys.MONGO_URI,
  collection: "sessions"
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "jdhfnjskhncbnjkmnxcbhj",
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use((req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
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
    app.listen(3000, () => {
      console.log("Server has started");
    });
  })
  .catch(console.log);
