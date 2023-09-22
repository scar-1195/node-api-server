const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.status(200).json(product);
};

const createProduct = async (req = request, res = response) => {
  const { state, authUser, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });
  if (productDB) {
    return res.status(400).json({
      msg: `product ${productDB.name} already exists`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.authUser._id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, authUser, ...data } = req.body;

  if (data.name) data.name = data.name.toUpperCase();
  data.user = req.authUser._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true },
  );
  res.status(200).json(deleteProduct);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
