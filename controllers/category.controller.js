const Category = require("../models/category")

const categoryGet = async (req, res) => {}

const categoryPost = async (req, res) => {
  const { nombre, estado, user } = req.body
  const category = new Category({ nombre, estado, user })

  await category.save()
  res.json({ category })
}
module.exports = {
  categoryGet,
  categoryPost,
}
