import { body, param } from "express-validator";

import validationMiddleware from "../middlewares/validator.middleware"

export const createBlablablaValidator = [
    body("name")
        .isString()
        .withMessage("title must be a string"),
    body("email").isEmail().withMessage("email must be a valid email"),
    body("password").isString().withMessage("password must be a string"),
    validationMiddleware
];

export const updateProductValidator = [
    body("name")
        .optional()
        .isString()
        .withMessage("name must be a string"),
    body("email").optional().isEmail().withMessage("email must be a valid email"),
    body("password").optional().isString().withMessage("password must be a string"),
    
    validationMiddleware
];