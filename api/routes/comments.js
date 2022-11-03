const validateProps = require("../middleware/validateProps")
const router = require("express").Router()
const {
  getComments,
  deleteComment,
  updateComment,
  createComment
} = require("../controller/comments.controller")

router.post("/", validateProps("author", "content"), createComment)
router.get("/", getComments)
router.put("/:id", validateProps("content"), updateComment)
router.delete("/:id", deleteComment)

module.exports = router