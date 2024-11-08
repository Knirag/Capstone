const Joi = require("joi");

const validateSignupData = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().length(10).required(),
  });
  return schema.validate(data);
};

module.exports = { validateSignupData };
