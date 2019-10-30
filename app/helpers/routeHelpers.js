const Joi = require('@hapi/joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signUpSchema: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    signInSchema: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    passwordSchema: Joi.object({
      id: Joi.string().required(),
      password: Joi.string().required()
    })
  }
};
