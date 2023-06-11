import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRequest } from "../types/user";
import { User } from "../models";

interface UserPayload {
  userId: string;
}

const verifyJWT = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization Token not found'
    })
  }

  try {
    const { userId } = verify(token, process.env.JWT_SECRET!) as UserPayload;
    const authUser = await User.findById(userId)
    req.user = authUser

    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}

export {
  verifyJWT
}