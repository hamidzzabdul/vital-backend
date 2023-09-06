const Category = require("../Models/Category");
const Product = require("../Models/Product");
const Subcategory = require("../Models/SubCategory");
const catchAsync = require("../utils/CatchAsync");
const factory = require("./HandlerFactory");

exports.getAllCategoryProducts = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const docs = await Product.find({ category: categoryId });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: {
      docs,
    },
  });
});
exports.getAllCategorySubCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const docs = await Subcategory.find({ category: categoryId });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: {
      docs,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const doc = await Category.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.getAllCategories = factory.getAll(Category);
exports.updateOne = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.deleteAllCategories = factory.deleteAll(Category);
