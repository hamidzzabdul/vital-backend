const multer = require("multer");
const Product = require("../Models/Product");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/CatchAsync");
const path = require("path");
const cloudinary = require("../utils/cloudinary");

const factory = require("./HandlerFactory");
const Category = require("../Models/Category");
const Subcategory = require("../Models/SubCategory");

// const multerStorage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
// });
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});
exports.uploadProductImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(400).json({
        status: "error",
        message: "Image upload failed",
      });
    }
    next();
  });
};

exports.createProduct = catchAsync(async (req, res) => {
  const cloudinaryRes = await cloudinary.handleUpload(req.file.buffer);
  const productData = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    subCategory: req.body.subCategory || null,
    tags: req.body.tags,
    productImage: cloudinaryRes.url,
  };
  const newDoc = await Product.create(productData);
  console.log(newDoc);
  setTimeout(() => {
    res.status(201).json({
      status: "success",
      data: {
        newDoc,
      },
    });
  }, 1000);
});

exports.getAllData = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  const products = await Product.find();
  const subCategories = await Subcategory.find();
  const data = {
    categories,
    subCategories,
    products,
  };
  res.status(201).json({
    status: "success",
    data: {
      data,
    },
  });
});

exports.getAllProducts = factory.getAll(Product);
exports.updateOne = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.deleteAllProduct = factory.deleteAll(Product);
