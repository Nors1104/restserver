const { response, request } = require("express")
const { generateJWT } = require("../helpers/generate-jwt")
const bcryptjs = require("bcryptjs")
const User = require("../models/user")

const login = async (req = request, res = response) => {
  const { correo, password } = req.body
  try {
    // Verificar si el email existe
    const user = await User.findOne({ correo })
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales invalidas",
      })
    }

    // SI el user está activo
    if (!user.estado) {
      return res.status(400).json({
        msg: "Credenciales invalidas",
      })
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales invalidas",
      })
    }

    // Generar el JWT
    const token = await generateJWT(user.id)
    res.json({
      user,
      token,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    })
  }
}

module.exports = {
  login,
}
