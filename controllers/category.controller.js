const Category = require("../models/category")

const categoryGet = async (req, res) => {}

const categoryPost = async (req, res) => {
  console.log("add category")
  const { nombre, estado, user } = req.body
  const category = new Category({ nombre, estado, user })
  const categoryExist = await Category.findOne({ nombre })
  if (categoryExist) {
    return res.json({ error: "Error: la categoria ya existe" })
  }

  await category.save()
  res.json({ category })
  // try {
  // } catch (err) {
  //   if (err) {
  //     if (err.code === 11000) {
  //       res.json({ error: "Error: la categoria ya existe" })
  //     }
  //   }
  // }
}
module.exports = {
  categoryGet,
  categoryPost,
}
