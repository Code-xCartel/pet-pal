import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isActive: Boolean,
  subscription_model: { type: String, required: true, enum: ['basic', 'plus', 'gold'] },
})

export const User = mongoose.model('User', userSchema);