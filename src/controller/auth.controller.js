const throwHttpError = require("../utils/throwHttpError")
global.users = []

const signup = (req, res) => {
  try {
    const { email, username } = req.body
    const userInGlobal = global.users.find(user => user.email === email || user.username === username)
    if (userInGlobal === undefined) {
      global.users.push(req.body)
      res.status(201).end()
    } else {
      if (userInGlobal.email === email) {
        throwHttpError(res, 409, "Email alredy in use")
      } else {
        throwHttpError(res, 409, "Username alredy in use")
      }
    }

  } catch (error) {
    throwHttpError(res, 500, "internal server error")
  }
}

const login = (req, res) => {
  try {
    const { email, password } = req.body
    const user = global.users.find(user => user.email === email && user.password === password)
    if (user) {
      res.status(200).send(user)
    } else {
      throwHttpError(res, 401, "Wrong email or password")
    }
  } catch (error) {
    console.log(error)
    throwHttpError(res, 500, "internal server error")
  }
}

module.exports = {
  login,
  signup
}