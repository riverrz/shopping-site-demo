const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(console.log);
};
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then(products => {
//       if (products.length == 0) {
//         return res.redirect("/");
//       }
//       const product = products[0];
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product
//       });
//     })
//     .catch(console.log);
// };
// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDescription = req.body.description;
//   Product.findByPk(prodId)
//     .then(product => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.description = updatedDescription;
//       product.imageUrl = updatedImageUrl;

//       return product.save();
//     })
//     .then(result => {
//       console.log("Updated Product");
//       res.redirect("/admin/products");
//     })
//     .catch(console.log);
// };
// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     // Product.findAll()
//     .then(prods => {
//       res.render("admin/products", {
//         prods,
//         pageTitle: "Admin Products",
//         path: "/admin/products"
//       });
//     })
//     .catch(console.log);
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       res.redirect("/admin/products");
//     })
//     .catch(console.log);
// };
