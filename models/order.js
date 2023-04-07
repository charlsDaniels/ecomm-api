const { Schema, model } = require('mongoose');

const SizesSchema = new Schema({
  size: String,
  quantity: Number
})

const ItemSchema = new Schema({
  product: {
    type:  Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'product is required']
  },
  sizes: [SizesSchema]
})

const OrderSchema = ({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  items: [ItemSchema],
})

module.exports = model('Order', OrderSchema);
