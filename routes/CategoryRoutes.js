const express = require("express");

const router = express.Router();
const categoryController = require("../Controllers/CategoryController");

router.route("/create-category").post(categoryController.createCategory);
router.route("/:id").get(categoryController.getAllCategoryProducts);
router.route("/").get(categoryController.getAllCategories);

router
  .route("/subCategory/:id")
  .get(categoryController.getAllCategorySubCategory);

router.route("/delete").delete(categoryController.deleteAllCategories);
router
  .route("/:id")
  .patch(categoryController.updateOne)
  .delete(categoryController.deleteCategory);

module.exports = router;
