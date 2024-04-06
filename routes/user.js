const { Router } = require("express")
const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validate-fields")
const { userGet, userPost, userDelete, userPut, userPatch } = require("../controllers/user.controller")
const { emailExist, isRoleValid, userByIdExist } = require("../helpers/db-validators")
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router()

// router.get("/", function (req, res) {
//   res.json({ msg: "get user" })
// })
router.get("/", userGet)
router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de mas de 6 letras").isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    // check("correo").custom((email) => emailExist(email)),
    check("correo").custom(emailExist),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom((role) => isRoleValid(role)),
    validateFields,
  ],
  userPost
)

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID Válido").isMongoId(),
    // check("id").custom((id) => userByIdExist(id)),
    check("id").custom(userByIdExist),
    validateFields,
  ],
  userDelete
)
router.put("/:id", userPut)
router.patch("/", userPatch)
module.exports = router
