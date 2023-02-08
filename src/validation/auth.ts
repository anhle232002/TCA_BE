import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().required().label("Username"),
    fullName: Joi.string().required().label("Full Name"),
    password: Joi.string().required().min(6).label("Password"),
    repeat_password: Joi.ref("password"),
});
