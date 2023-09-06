const mongoose = require("mongoose");
const slugify = require("slugify");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    default: "",
  },
  slug: String,
});
subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Subcategory = mongoose.model("Subcategory", subCategorySchema);

module.exports = Subcategory;
