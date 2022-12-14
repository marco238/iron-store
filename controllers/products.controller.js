const Product = require("../models/Product.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("products/store", { products });
    })
    .catch((err) => next(err))
};

module.exports.create = (req, res, next) => {
  res.render("products/form");
}

module.exports.doCreate = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.redirect(`/products/${product._id}`);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      res.render("products/details", { product });
    })
    .catch((err) => {
      console.error(err);
      next(createError(404, "Product not found"));
    });
};
