const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server has started");
    });
  })
  .catch(console.log);
