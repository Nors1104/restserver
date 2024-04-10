const { Router } = require("express")
const { check } = require("express-validator")
const { productGet, productPost } = require("../controllers/product.controller")
const { validateFields } = require("../middlewares/validate-fields")
const router = Router()

router.get("/", productGet)
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("user", "El usuario es obligatorio").isMongoId(),
    check("category", "La categoria es obligatoria").isMongoId(),
    validateFields,
  ],
  productPost
)

module.exports = router
