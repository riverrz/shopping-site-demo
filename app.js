const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const app = express();
app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("Server has started");
});
