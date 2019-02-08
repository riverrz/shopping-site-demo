const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const mongoConnect = require("./utils/database").mongoConnect;
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(console.log);
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is running");
  });
});
