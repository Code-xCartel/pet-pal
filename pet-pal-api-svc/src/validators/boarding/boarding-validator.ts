import validations from '../common.js';

export const boardingValidator = [
	validations.required('requesterId'),
	validations.required('requestedId'),
	validations.required('petType'),
	validations.required('petId'),
	validations.required('timeSlot'),
	validations.required('userSubscriptionModel'),
];
