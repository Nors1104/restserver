const jwt = require("jsonwebtoken")

const generateJWT = (uid = "") => {
  const payload = { uid }
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY,
      {
        expiresIn: "1h", //"1h"
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el token")
        } else {
          resolve(token)
        }
      }
    )
  })
}

module.exports = {
  generateJWT,
}
