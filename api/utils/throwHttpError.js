const throwHttpError = (res, statusCode, message) => {
  res.status(statusCode).send(message)
}
module.exports = throwHttpError