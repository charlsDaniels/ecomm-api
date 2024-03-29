const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String, 
    required: [true, 'password is required']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  active: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, _id, password, ...user } = this.toObject()
  return {
    uid: _id,
    ...user
  }
}

module.exports =  model('User', UserSchema);
