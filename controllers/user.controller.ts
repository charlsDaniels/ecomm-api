import { Request, Response } from "express";

import bcrypt from 'bcryptjs';
import { User } from "../models";
import { UserRequest } from "../types/user";

const usersGet = async (req: Request, res: Response) => {
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

const userGet = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json(user)
}

const userCreate = async (req: Request, res: Response) => {
  const { username, email, password, role, ...rest } = req.body

  const salt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = new User({ username, email, password: hashedPassword, role, rest });
  await user.save()

  res.status(201).json(user)
}

const userUpdate = async (req: Request, res: Response) => {

  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  if (password) {
    const salt = bcrypt.genSaltSync()
    rest.password = bcrypt.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.status(204).json(user)
}

const userDelete = async (req: UserRequest, res: Response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { active: false })
  res.json({
    user,
    authUser: req.user
  })
}

export {
  usersGet,
  userGet,
  userCreate,
  userUpdate,
  userDelete
}