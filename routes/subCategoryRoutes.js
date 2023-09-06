const express = require("express");

const subCategoryController = require("../Controllers/SubcategoryController");

const router = express.Router();

router.route("/").get(subCategoryController.getAllSubCategories);

router
  .route("/create-sub-category")
  .post(subCategoryController.createSubCategory);

router.route("/:id").get(subCategoryController.getSubCategoryProducts);
router.route("/edit/:id").patch(subCategoryController.updateOne);
router.route("/delete").delete(subCategoryController.deleteAllSubcategories);
router.route("/delete/:id").delete(subCategoryController.deleteSubcategory);

module.exports = router;
