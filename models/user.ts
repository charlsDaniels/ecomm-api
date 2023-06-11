import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
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
  const { __v, _id, ...user } = this.toObject()
  return {
    uid: _id,
    ...user
  }
}

export const User = typedModel('User', UserSchema);
export type UserDoc = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
