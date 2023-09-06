const multer = require("multer");
const Product = require("../Models/Product");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/CatchAsync");
const path = require("path");

const factory = require("./HandlerFactory");

const multerStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.uploadProductImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: "Image upload failed",
      });
    }
    next();
  });
};

exports.createProduct = catchAsync(async (req, res) => {
  const productData = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    subCategory: req.body.subCategory || null,
    tags: req.body.tags,
    productImage: req.file.path,
  };

  const newDoc = await Product.create(productData);
  setTimeout(() => {
    res.status(201).json({
      status: "success",
      data: {
        newDoc,
      },
    });
  }, 1000);
});

exports.getAllProducts = factory.getAll(Product);
exports.updateOne = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.deleteAllProduct = factory.deleteAll(Product);
