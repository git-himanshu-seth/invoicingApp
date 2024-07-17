const Joi = require('joi');
const { validate, validateObjectId } = require('../../utils/validate');

const schema = Joi.object({
  customerName: Joi.string().min(3).max(50).required(),
  invoices: Joi.array()
    .items(
      Joi.object({
        product: Joi.custom(validateObjectId).required(),
        rate: Joi.number().min(0).required(),
        unit: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        discount: Joi.number().precision(2).required(),
        netAmount: Joi.number().precision(2).required(),
        totalAmount: Joi.number().precision(2).required(),
      }),
    )
    .min(1)
    .required(),
});

exports.createValidator = validate(schema);
