const throwHttpError = require("../utils/throwHttpError")
global.comments = []

const createComment = (req, res) => {
  try {
    const { author, content } = req.body
    const id = global.comments.length + 1
    const comment = {
      author,
      content,
      id
    }
    global.comments.push(comment)
    res.status(201).json(comment)
  } catch (e) {
    throwHttpError(res, 500, "internal server error")
  }
}
const updateComment = (req, res) => {
  try {
    const comments = global.comments
    const { id } = req.params
    const index = comments.findIndex(item => item.id == id)
    const { content } = req.body
    global.comments[index].content = content
    res.status(200).send("ok")
  } catch (e) {
    console.log(e)
    throwHttpError(res, 500, "internal server error")
  }
}
const deleteComment = (req, res) => {
  try {
    const { id } = req.params
    global.comments = global.comments.filter(comment => comment.id != id)
    res.status(200).send("OK")
  } catch (e) {
    throwHttpError(res, 500, "internal server error")
  }

}
const getComments = (req, res) => {
  try {
    res.status(200).json(global.comments)
  } catch (e) {
    throwHttpError(res, 500, "internal server error")
  }
}

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getComments
}