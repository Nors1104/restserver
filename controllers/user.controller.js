const User = require("../models/user")
const bcryptjs = require("bcryptjs")

const userGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query
  // const users = await User.find({ estado: true }).skip(from).limit(limit)
  // const total = await User.countDocuments({ estado: true })

  const [total, users] = await Promise.all([User.countDocuments({ estado: true }), User.find({ estado: true }).skip(from).limit(limit)])
  res.json({ total, users })
  // res.json(resp)
}
const userPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body
  const user = new User({ nombre, correo, password, rol })

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await user.save()
  res.json({
    user,
  })
}
const userDelete = async (req, res) => {
  const { id } = req.params

  // Fisicamente lo borramos
  // const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate(id, { estado: false })

  res.json(user)
}
const userPut = (req, res) => {
  res.json({ msg: "put user" })
}
const userPatch = (req, res) => {
  res.json({ msg: "patch user" })
}

module.exports = { userGet, userPost, userDelete, userPut, userPatch }
