import { NextFunction, Response } from "express";
import { UserRequest } from '../types/user';

// const isAdminUser = (req: UserRequest, res: Response, next: NextFunction) => {
//   const user = req.user

//   if (!user) {
//     return res.status(500).json({
//       msg: 'Validate token before call this method'
//     })
//   }

//   if (user.role !== 'ADMIN_ROLE') {
//     return res.status(401).json({
//       msg: "You don't have admin role privileges"
//     })
//   }

//   next()
// }

const hasRole = (...roles: any[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res.status(500).json({
        msg: 'Validate token before call this method'
      })
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        msg: `${roles} needed for this service`
      })
    }

    next()
  }
}

export {
  // isAdminUser,
  hasRole
}