const { Router } = require("express")
const { check } = require("express-validator")
const { categoryGet, categoryPost } = require("../controllers/category.controller")
const { validateFields } = require("../middlewares/validate-fields")
const router = Router()

router.get("/", categoryGet)
router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), check("user", "El usuario es obligatorio").isMongoId(), validateFields],
  categoryPost
)
module.exports = router
