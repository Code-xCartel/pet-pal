import validations from "../common.js";

export const createSubscriptionValidator = [
  validations.required('subscription_model'),
]