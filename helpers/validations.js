const { User, Role, Category } = require('../models')

const validateRole = async (role) => {
  if (role) {
    const exists = await Role.findOne({ role })
    if (!exists) {
      throw new Error(`Role ${role} is not registered in DB`)
    }
  }
}

const validateEmail = async (email) => {
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error(`Email ${email} already exists`)
  }
}

const documentExists = async (documentId, collection) => {
  const document = await collection.findById(documentId)
  if (!document) {
    throw new Error(`There is no document with id ${documentId}`)
  }
}

const categoryExistsByName = async (category) => {
  const categoryDB = await Category.findOne({ name: category })
  if (!categoryDB) {
    throw new Error(`Category '${category}' doesn't exists`)
  }

  return categoryDB;
}

const validateUsername = async (username) => {
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    throw new Error(`Username ${username} already exists`)
  }
}

module.exports = {
  categoryExistsByName,
  documentExists,
  validateEmail,
  validateRole,
  validateUsername,
}