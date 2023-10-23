const path = require("path");
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(
  cors({
    origin: [
      "https://awful-erin-bandanna.cyclic.app",
      "https://awful-erin-bandanna.cyclic.app/api/v1/products",
      "https://vitalmediquip.co.ke",
      "http://localhost:5173",
    ],
    credentials: true,
    exposedHeaders: ["Content-Range"],
  })
);

const productRouter = require("./routes/Allroutes");
const subCategoryRouter = require("./routes/subCategoryRoutes");
const categoryRouter = require("./routes/CategoryRoutes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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
