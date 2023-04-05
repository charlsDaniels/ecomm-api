const { Order } = require("../models")

const ordersGet = async (req, res) => {
  const { from = 0, limit = 5 } = req.query
  
  const [total, orders] = await Promise.all([
    await Order.countDocuments(),
    await Order.find()
    .skip(Number(from))
    .limit(Number(limit))
  ])
  
  for (const order of orders) {
    await order.populate('buyer', 'name')
    // .populate('category')
  }
  
  res.json({
    total,
    orders
  })
}

const orderCreate = async (req, res) => {
  const data = {
    ...req.body,
    buyer: req.user._id
  }

  const order = new Order(data)
  await order.save()

  res.status(201).json(order)
}

//TO DO: Update and Delete methods
module.exports = {
  ordersGet,
  orderCreate
}