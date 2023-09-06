const express = require("express");

const productController = require("../Controllers/ProductController");

const router = express.Router();

router.route("/").get(productController.getAllData);

router
  .route("/create-products")
  .post(productController.uploadProductImage, productController.createProduct);

router.route("/delete").delete(productController.deleteAllProduct);
router
  .route("/:id")
  .patch(productController.uploadProductImage, productController.updateOne)
  .delete(productController.deleteProduct);

module.exports = router;
