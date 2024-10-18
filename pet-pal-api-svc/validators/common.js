import { body, param } from "express-validator";

const validations = {
  paramId: (field) => param(field).isMongoId().withMessage(`${field} is not a valid mongo id`),
  required: (field) =>  body(field).notEmpty().withMessage(`${field} is required`),
  number: (field) => body(field).isNumeric(),
  email: (field) =>  body(field).notEmpty().withMessage(`${field} is required`)
    .isEmail().withMessage(`Invalid ${field}`),
  minMax: (field, min, max) => body(field).notEmpty().withMessage(`${field} is required`)
    .isLength({ min, max }).withMessage(`${field} character limit not satisfied`),
  oneOf: (field, list) => body(field).notEmpty().withMessage(`${field} is required`)
    .isIn(list).withMessage(`${field} must be one of ${list}`),
};

export const idValidator = (field) => validations.paramId(field);

export default validations;
