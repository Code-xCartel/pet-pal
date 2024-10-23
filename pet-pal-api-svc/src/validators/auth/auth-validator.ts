import validations from '../common.js';

export const registrationValidator = [
	validations.required('username'),
	validations.minMax('password', 4, 12),
	validations.email('email'),
];

export const activationValidator = [
	validations.required('password'),
	validations.required('userId'),
	validations.required('key'),
];

export const loginValidator = [
	validations.email('email'),
	validations.minMax('password', 4, 12),
];

export const userUpdateValidator = [
	validations.required('name'),
	validations.required('contact'),
	validations.required('address'),
];

export const groomerBoarderValidator = [
	validations.required('name'),
	validations.required('contact'),
	validations.nonEmptyArray('petType'),
	validations.required('city'),
];
