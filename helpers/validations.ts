import { User, Role, Category } from '../models';

const validateRole = async (role: string) => {
  if (role) {
    const exists = await Role.findOne({ role })
    if (!exists) {
      throw new Error(`Role ${role} is not registered in DB`)
    }
  }
}

const validateEmail = async (email: string) => {
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error(`Email ${email} already exists`)
  }
}

const documentExists = async (documentId: string, collection: any) => {
  const document = await collection.findById(documentId)
  if (!document) {
    throw new Error(`There is no document with id ${documentId}`)
  }
}

const categoryExistsByName = async (category: string) => {
  const categoryDB = await Category.findOne({ name: category })
  if (!categoryDB) {
    throw new Error(`Category '${category}' doesn't exists`)
  }

  return categoryDB;
}

const validateUsername = async (username: string) => {
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    throw new Error(`Username ${username} already exists`)
  }
}

export {
  categoryExistsByName,
  documentExists,
  validateEmail,
  validateRole,
  validateUsername,
}