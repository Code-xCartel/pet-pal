import mongoose, { type Document, type Schema } from 'mongoose';
import { DocumentResult } from '../../common.js';

type CartItem = {
	itemId: string;
	quantity: number;
};

type Cart = Document &
	DocumentResult<any> & {
		items: CartItem[];
		userId: Schema.Types.ObjectId;
	};

const cartSchema = new mongoose.Schema<Cart>(
	{
		items: [
			{
				itemId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
			},
		],
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

export const CartModel = mongoose.model<Cart>('Cart', cartSchema);
