const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token") || req.header("Authorization")
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY)
    // leer el usuario que corresponde al uid
    const user = await User.findById(uid)
    if (!user) {
      return res.status(401).json({
        msg: "Token no válido",
      })
    }
    // Verificar si el uid tiene estado true
    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no válido - user con estado: false",
      })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    })
  }
}

module.exports = {
  validateJWT,
}
