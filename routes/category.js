const { Router } = require("express")
const { check } = require("express-validator")
const { categoryGet, categoryPost } = require("../controllers/category.controller")

const router = Router()

router.get("/", categoryGet)
router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), check("estado", "El estado es obligatorio").not().isEmpty().isBoolean],
  check("user", "El usuario es obligatorio").isMongoId(),
  categoryPost
)
module.exports = router
