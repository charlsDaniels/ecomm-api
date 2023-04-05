const { Schema, model } = require('mongoose');

const StockSchema = new Schema({ size: String, quantity: Number });

const ProductSchema = ({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  description: {
    type: String
  },
  isAvailable: {
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
  isFeatured: {
    type: Boolean,
    default: false
  },
  pictureUrl: {
    type: String,
  },
  stock: [StockSchema]
})

// ProductSchema.methods.toJSON = function () {
//   const { __v, active, ...data } = this.toObject()
//   return data
// }

module.exports = model('Product', ProductSchema);
