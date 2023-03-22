const isAdminUser = (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(500).json({
      msg: 'Validate token before call this method'
    })
  }

  if (user.role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: "You don't have admin role privileges"
    })
  }

  next()
}

const hasRole = (...roles) => {
  return (req, res, next) => {
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

module.exports = {
  isAdminUser,
  hasRole
}