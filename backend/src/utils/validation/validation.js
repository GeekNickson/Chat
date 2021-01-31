const Joi = require('@hapi/joi');

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports = validation;
