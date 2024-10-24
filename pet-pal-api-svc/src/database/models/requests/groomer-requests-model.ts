import mongoose, { type Document } from 'mongoose';
import { DocumentResult } from '../../common.js';

type GRequest = Document &
	DocumentResult<any> & {
		requesterId: string;
		requestedId: string;
		petType: string;
		petId: string;
		timeSlot: [number, number];
		status: 'pending' | 'rejected' | 'accepted';
	};

const groomerRequestSchema = new mongoose.Schema<GRequest>(
	{
		requesterId: { type: String, required: true },
		requestedId: { type: String, required: true },
		petType: { type: String, required: true },
		petId: { type: String, required: true },
		timeSlot: { type: [Number, Number], required: true },
		status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
	},
	{ timestamps: true }
);

export const GroomerRequestModel = mongoose.model<GRequest>(
	'Groomer Requests',
	groomerRequestSchema
);
