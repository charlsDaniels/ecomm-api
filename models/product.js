const { Schema, model } = require('mongoose');

const ProductSchema = ({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  description: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category is required']
  },
  price: {
    type: Number,
    required: true,
    required: [true, 'price is required'],
  },
  available: {
    type: Boolean,
    default: true
  }
})

console.log(ProductSchema.methods)
// ProductSchema.methods.toJSON = function () {
//   const { __v, active, ...data } = this.toObject()
//   return data
// }

module.exports = model('Product', ProductSchema);
