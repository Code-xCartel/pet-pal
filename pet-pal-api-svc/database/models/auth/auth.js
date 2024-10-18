import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isActive: Boolean,
})

export const User = mongoose.model('User', userSchema);