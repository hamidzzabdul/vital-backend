const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRouter = require("./routes/Allroutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const categoryRouter = require("./routes/CategoryRoutes");

const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173", // Replace with your frontend's URL
    // origin: "https://awful-erin-bandanna.cyclic.app", // Replace with your frontend's URL
    origin: [
      "https://awful-erin-bandanna.cyclic.app",
      // "http://vitalmediquip.co.ke",
      "http://localhost:5173",
    ], // Replace with your frontend's URL
    // origin: "*", // Replace with your frontend's URL
    credentials: true,
    exposedHeaders: ["Content-Range"],
  })
);

// set http headers

app.use("/public", express.static("public"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/products/subCategory", subCategoryRouter);
app.use("/api/v1/products/category", categoryRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cant find ${req.originalUrl} on this server!`,
  });
});
module.exports = app;
