const { login, signup } = require("../controller/auth.controller")
const validateProps = require("../middleware/validateProps")

const router = require("express").Router()

router.post("/signup", validateProps("email", "username", "password"), signup)

router.post("/login", validateProps("email", "password"), login)
router.get("/", (req, res) => {
  res.send(global.users)
})

module.exports = router