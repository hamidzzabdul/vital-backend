const catchAsync = require("./../utils/CatchAsync");
const APIFeatures = require("./../utils/ApiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "No doc found with that id",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany();
    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "no products to delete",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory || null,
      tags: req.body.tags,
    };
    // Check if a file was uploaded
    if (req.file) {
      productData.productImage = req.file.path || "";
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "No doc found with that id",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "No doc found with that id",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
