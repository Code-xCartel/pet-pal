import validations from '../common.js';

export const cartValidator = [validations.nonEmptyArray('cartItems')];
