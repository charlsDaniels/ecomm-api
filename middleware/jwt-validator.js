const { request, response } = require("express");
const { verify } = require("jsonwebtoken");
const User = require('../models/user');

const verifyJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      error: 'Authorization Token not found'
    })
  }

  try {
    const { userId } = verify(token, process.env.JWT_SECRET)
    const authUser = await User.findById(userId)
    req.user = authUser

    next()
  } catch (error) {
    res.status(401).json({
      error: 'Token is not valid'
    })
  }
}

module.exports = {
  verifyJWT
}
