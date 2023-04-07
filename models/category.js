const { Schema, model } = require('mongoose');

const CategorySchema = ({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required'],
  },
  parentId: {
    type: Schema.Types.ObjectId,
    default: null
  }
})

// CategorySchema.methods.toJSON = function () {
//   const { __v, active, ...data } = this.toObject()
//   return data
// }

module.exports = model('Category', CategorySchema);