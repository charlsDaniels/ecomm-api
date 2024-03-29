const { categoryExistsByName } = require("../helpers/validations")
const { Product, Category } = require("../models")

const productsGet = async (req, res) => {
  const { from = 0, limit = 5, category } = req.query
  const query = { isAvailable: true }

  if (category) {
    const categoryDB = await categoryExistsByName(category)
    query.category = categoryDB._id
  }

  const [total, products] = await Promise.all([
    await Product.countDocuments(query),
    await Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

const productGet = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

  res.json(product)
}

const productCreate = async (req, res) => {
  const { user, category, ...body } = req.body

  //TO DO: Check by name if Product already exists {body.name}

  const categoryDB = await Category.findOne({ name: category.toUpperCase() })
  if (!categoryDB) {
    return res.status(400).json({
      msg: `Category '${category}' doesn't exists`
    })
  }

  const data = {
    ...body,
    user: req.user._id,
    category: categoryDB,
  }

  const product = new Product(data)
  await product.save()

  res.status(201).json(product)
}

//TO DO: Update and Delete methods

module.exports = {
  productsGet,
  productGet,
  productCreate,
}