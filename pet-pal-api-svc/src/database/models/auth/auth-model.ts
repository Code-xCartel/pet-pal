import mongoose, { type Document } from 'mongoose';

export type IUser = Document & {
	username: string;
	password: string;
	email: string;
	isActive: boolean;
	subscription_model: 'basic' | 'plus' | 'gold';
};

const userSchema = new mongoose.Schema<IUser>({
	username: String,
	password: String,
	email: { type: String, unique: true, required: true },
	isActive: Boolean,
	subscription_model: {
		type: String,
		required: true,
		enum: ['basic', 'plus', 'gold'],
	},
});

export const User = mongoose.model<IUser>('User', userSchema);
