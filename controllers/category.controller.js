const { Category } = require('../models')

const categoriesGet = async (req, res) => {
  const { from = 0, limit } = req.query
  const query = { active: true }

  const categories = await Category.find(query)
    .skip(Number(from))
    .limit(Number(limit))

  res.json(await nestedCategories(categories))
}

const nestedCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == null);
  } else {
    category = categories.filter(cat => String(cat.parentId) == String(parentId));
  }

  for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        children: nestedCategories(categories, cate._id)
      })
  }

  return categoryList;
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
    parentId: req.body.parentId,
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
  const category = await Category.findByIdAndUpdate(id, { active: false }, { new: true })
  res.json(category)
}

module.exports = {
  categoryGet,
  categoriesGet,
  categoryCreate,
  categoryUpdate,
  categoryDelete
}