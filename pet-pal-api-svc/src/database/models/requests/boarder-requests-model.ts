import mongoose, { type Document } from 'mongoose';
import { DocumentResult } from '../../common.js';
import { SUBSCRIPTION_LEVELS } from '../../../constants/subscription-models.js';

export type Request = Document &
	DocumentResult<any> & {
		requesterId: string;
		requestedId: string;
		petType: string;
		petId: string;
		timeSlot: [number, number];
		userSubscriptionModel: string;
		status: 'pending' | 'rejected' | 'accepted' | 'started';
		sessionId?: string;
	};

const boarderRequestSchema = new mongoose.Schema<Request>(
	{
		requesterId: { type: String, required: true },
		requestedId: { type: String, required: true },
		petType: { type: String, required: true },
		petId: { type: String, required: true },
		timeSlot: { type: [Number, Number], required: true },
		userSubscriptionModel: {
			type: String,
			required: true,
			enum: SUBSCRIPTION_LEVELS,
		},
		status: {
			type: String,
			enum: ['pending', 'accepted', 'rejected', 'started'],
		},
		sessionId: { type: String },
	},
	{ timestamps: true }
);

export const BoarderRequestModel = mongoose.model<Request>(
	'Requests',
	boarderRequestSchema
);
