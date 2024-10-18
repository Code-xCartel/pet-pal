import validations from "../common.js";

export const registrationValidator = [
  validations.username,
  validations.password,
  validations.email,
];

export const loginValidator = [
  validations.email,
  validations.password,
];

export const userNameValidator = [
  validations.username,
]