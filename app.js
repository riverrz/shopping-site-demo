const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});

// Associations
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Shivam", email: "admin@test.com" });
    }
    return Promise.resolve(user);
  })
  .then(user => {
    return user
      .getCart()
      .then(cart => {
        if (!cart) {
          return user.createCart();
        }
        return cart;
      })
      .catch(console.log);
  })
  .then(cart => {
    app.listen(3000, () => {
      console.log("Server has started");
    });
  })
  .catch(console.log);
