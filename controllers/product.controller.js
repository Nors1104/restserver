const Product = require("../models/product")

const productGet = async (req, res) => {}

const productPost = async (req, res) => {
  const { nombre, estado, user, precio, category, descripcion, disponible } = req.body
  const product = new Product({ nombre, estado, user, precio, category, descripcion, disponible })
  await product.save()
  res.json({ category })
}

module.exports = {
  productGet,
  productPost,
}
