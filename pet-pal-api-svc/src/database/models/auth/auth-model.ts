import mongoose, { type Document } from 'mongoose';

export type User = Document & {
	username: string;
	password: string;
	email: string;
	isActive: boolean;
	isAdmin: boolean;
	isPersonnel: boolean;
	subscription_model: 'basic' | 'plus' | 'gold';
};

const userSchema = new mongoose.Schema<User>({
	username: String,
	password: String,
	email: { type: String, unique: true, required: true },
	isActive: Boolean,
	isAdmin: Boolean,
	isPersonnel: Boolean,
	subscription_model: {
		type: String,
		required: true,
		enum: ['basic', 'plus', 'gold'],
	},
});

export const User = mongoose.model<User>('User', userSchema);
