const throwHttpError = require("../utils/throwHttpError")
const validateProps = (...props) => (req, res, next) => {
  try {
    const { body } = req
    const missingProps = []
    const parsedBody = {}
    props.forEach(prop => {
      if (!body[prop]) {
        missingProps.push(prop)
      } else {
        parsedBody[prop] = body[prop]
      }
    })
    if (missingProps.length) {
      throwHttpError(res, 400, `missing props: ${missingProps}`)
    } else {
      req.body = parsedBody
      next()
    }
  } catch (e) {
    throwHttpError(res, 500, "internal server error")
  }
}
module.exports = validateProps