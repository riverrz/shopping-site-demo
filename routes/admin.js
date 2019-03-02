const express = require("express");

const router = express.Router();
const adminController = require("../controllers/admin");
const { body } = require("express-validator/check");

const isAuth = require("../middleware/is-auth");

router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", isAuth, adminController.getProducts);
router.post(
  "/add-product",
  [
    body("title")
    .isString()
    .isLength({ min: 5 })
    .trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-product",
  [
    body("title")
      .trim()
      .isString()
      .isLength({ min: 5 }),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
