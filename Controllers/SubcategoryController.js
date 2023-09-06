const Product = require("../Models/Product");
const Subcategory = require("../Models/SubCategory");
const catchAsync = require("../utils/CatchAsync");
const factory = require("./HandlerFactory");

exports.getSubCategoryProducts = catchAsync(async (req, res) => {
  const subCategoryId = req.params.id;
  const docs = await Product.find({ subCategory: subCategoryId });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: {
      docs,
    },
  });
});

exports.createSubCategory = catchAsync(async (req, res) => {
  const newSubCategory = new Subcategory(req.body);
  const newDoc = await newSubCategory.save();

  res.status(200).json({
    status: "success",
    data: {
      newDoc,
    },
  });
});

exports.getAllSubCategories = factory.getAll(Subcategory);
exports.updateOne = factory.updateOne(Subcategory);
exports.deleteSubcategory = factory.deleteOne(Subcategory);
exports.deleteAllSubcategories = factory.deleteAll(Subcategory);
