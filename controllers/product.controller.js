const Product = require("../models/product")

const productGet = async (req, res) => {
  // 2 - busco los productos de ese usuario
  // Product.find({})
  //const products = await Product.find({ user: req.user.id })
  const products = await Product.find({ user: req.user.id })
  res.json({ products })
}

const productPost = async (req, res) => {
  const { nombre, estado, user, precio, category, descripcion, disponible } = req.body
  const product = new Product({ nombre, estado, user, precio, category, descripcion, disponible })

  const productExist = await Product.findOne({ nombre })
  if (productExist) {
    return res.json({ error: "Error: el producto ya existe" })
  }
  await product.save()
  res.json({ product })
}

module.exports = {
  productGet,
  productPost,
}
