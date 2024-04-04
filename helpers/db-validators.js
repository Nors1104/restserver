const User = require("../models/user")
const Role = require("../models/role")

const isRoleValid = async (rol = "") => {
  const role = await Role.findOne({ rol })
  if (!role) {
    throw new Error(`El rol ${rol} no está registrado en la DB`)
  }
}

// verificar email existe
const emailExist = async (correo = "") => {
  const user = await User.findOne({ correo })
  if (user) {
    // return res.status(400).json({
    //   msg: "Ese correo esta registrado",
    // })
    throw new Error(`El correo ${correo} esta registrado`)
  }
}

const userByIdExist = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error(`El id no existe: ${id}`)
  }
}

module.exports = {
  emailExist,
  isRoleValid,
  userByIdExist,
}
