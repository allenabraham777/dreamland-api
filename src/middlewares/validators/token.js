import Joi from "joi";

const addTokenSchema = Joi.object().keys({
  user: Joi.string().required().messages({
    "any.required": "user is required",
  }),
  token: Joi.number().required().messages({
    "any.required": "token is required",
  }),
});

const addTokenvalidator = (req, res, next) => {
  const { body } = req;
  const { error } = addTokenSchema.validate(body);

  if (error) {
    console.error(error);
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
  next();
};

export default {
  addTokenvalidator,
};
