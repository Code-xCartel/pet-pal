import mongoose, { type Document } from 'mongoose';
import { DocumentResult } from '../../common.js';

type Product = Document &
	DocumentResult<any> & {
		name: string;
		description: string;
		category: 'Food' | 'Toys' | 'Accessories' | 'Grooming' | 'Healthcare';
		price: number;
		stock: number;
		brand?: string;
		petType: 'Dog' | 'Cat' | 'Bird' | 'Reptile' | 'Fish' | 'Small Animal';
		isFeatured?: boolean;
		images?: string[];
	};

const productSchema = new mongoose.Schema<Product>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['Food', 'Toys', 'Accessories', 'Grooming', 'Healthcare'],
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		brand: {
			type: String,
			trim: true,
		},
		petType: {
			type: String,
			enum: ['Dog', 'Cat', 'Bird', 'Reptile', 'Fish', 'Small Animal'],
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		images: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

export const ProductModel = mongoose.model<Product>('Product', productSchema);