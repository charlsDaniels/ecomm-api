const bcrypt = require('bcryptjs')
const User = require("../models/user")

const usersGet = async (req, res) => {
  const { from = 0, limit = 5 } = req.query
  const query = { active: true }

  const [total, users] = await Promise.all([
    await User.countDocuments(query),
    await User.find(query).skip(Number(from)).limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const userGet = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json(user)
}

const userCreate = async (req, res) => {

  const { name, email, password, role, ...rest } = req.body

  const salt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = new User({ name, email, password: hashedPassword, role, rest });
  await user.save()

  res.status(201).json(user)
}

const userUpdate = async (req, res) => {

  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  if (password) {
    const salt = bcrypt.genSaltSync()
    rest.password = bcrypt.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.status(204).json(user)
}

const userDelete = async (req, res) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { active: false })
  res.json({
    user,
    authUser: req.user
  })
}

module.exports = {
  usersGet,
  userGet,
  userCreate,
  userUpdate,
  userDelete
}