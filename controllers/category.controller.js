const { Category } = require('../models')

const categoriesGet = async (req, res) => {
  const { from = 0, limit = 5 } = req.query
  const query = { active: true }

  const [total, categories] = await Promise.all([
    await Category.countDocuments(query),
    await Category.find(query)
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  for (const cat of categories) {
    await cat.populate('user')
  }

  res.json({
    total,
    categories
  })
}

const categoryGet = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id)

  await category.populate('user', 'name');

  res.json(category)
}

const categoryCreate = async (req, res) => {
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category '${name}' already exists`
    })
  }

  const data = {
    name,
    user: req.user._id
  }
  const category = new Category(data)
  await category.save()

  res.status(201).json(category)
}

const categoryUpdate = async (req, res) => {
  const { id } = req.params
  const { user, active, ...data } = req.body

  data.user = req.user._id
  data.name = data.name.toUpperCase()

  const categoryDB = await Category.findOne({ name: data.name })
  if (categoryDB && categoryDB._id != id) {
    return res.status(400).json({
      msg: `Category '${data.name}' already exists`
    })
  }

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)
}

const categoryDelete = async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, { active: false}, { new: true })
  res.json(category)
}

module.exports = {
  categoryGet,
  categoriesGet,
  categoryCreate,
  categoryUpdate,
  categoryDelete
}