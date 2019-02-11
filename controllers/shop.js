const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(prods => {
      res.render("shop/product-list", {
        prods,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(console.log);
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(console.log);
};
exports.getIndex = (req, res, next) => {
  Product.find()
    .then(prods => {
      res.render("shop/index", {
        prods,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(console.log);
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate() // to get a promise from populate
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products
      });
    })
    .catch(console.log);
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log("Added to cart");
      res.redirect("/cart");
    })
    .catch(console.log);
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(console.log);
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId") // populate the productId field with the all the data of that product
    .execPopulate() // to get a promise from populate
    .then(user => {
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc } // ._doc gives just the data and removing all the methods which will else interfere
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id
        },
        products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(console.log);
};
exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then(orders => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
