const { Router } = require("express")
const { check } = require("express-validator")
const { productGet, productPost } = require("../controllers/product.controller")
const router = Router()

router.get("/", productGet)
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio").not().isEmpty().isBoolean,
    check("user", "El usuario es obligatorio").isMongoId(),
    check("category", "La categoria es obligatoria").isMongoId(),
  ],
  productPost
)

module.exports = router
