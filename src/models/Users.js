import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().required().min(3).max(16),
    email: joi.string().email().required().min(5).max(50),
    password: joi.string().required().min(2).max(25),
    confirmPassword: joi.string().required().min(2).max(25),
});

export const loginSchema = joi.object({
    email: joi.string().email().required().min(5).max(50),
    password: joi.string().required().min(2).max(25),
});