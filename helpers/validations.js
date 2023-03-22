const { User, Role } = require('../models')

const validateRole = async(role) => {
  const exists = await Role.findOne({ role })
  if (!exists) {
    throw new Error(`Role ${role} is not registered in DB`)
  }
}

const validateEmail = async(email) => {
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error(`Email ${email} already exists`)
  }
}

const documentExists = async(documentId, collection) => {
  const document = await collection.findById(documentId)
  if (!document) {
    throw new Error(`There is no document with id ${documentId}`)
  }
}

module.exports = {
  validateRole,
  validateEmail,
  documentExists
}