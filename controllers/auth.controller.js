const User = require("../models/user")
const bcrypt = require('bcryptjs')
const { generateJWT } = require("../helpers/jwt")
const { googleVerify } = require("../helpers/google-verify")

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const error = 'User/Password invalid'

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        error
      })
    }

    if (!user.active) {
      return res.status(400).json({
        error
      })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        error
      })
    }

    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Error - Call to the system administrator'
    })
  }
}

const googleSignIn = async (req, res) => {

  const { idToken } = req.body

  try {
    
    const googleUser = await googleVerify(idToken)

    const { email, name, picture } = googleUser

    let user = await User.findOne({ email })
    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.active) {
      return res.status(400).json({
        msg: 'User is not active'
      })
    }

    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })

  } catch (error) {
    res.status(500).json({
      msg: 'Token could not be verified'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}