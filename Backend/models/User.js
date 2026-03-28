import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImg: String,
  profileThumbImg: String,
  accountCreatedDate: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('User', userSchema);
