const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: String,
  tags: [String],
  productImage: {
    type: String,
    required: [true, "A product must have an image"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
    default: null,
  },
});

productSchema.index({ slug: 1 });

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre("save", function (next) {
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags.map((tag) => tag.toLowerCase());
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
