import Joi from 'joi'

export const createBookingSchema = Joi.object({
  service_id: Joi.number().integer().required().messages({
    'number.base': 'Service ID must be a number.',
    'number.integer': 'Service ID must be an integer.',
    'any.required': 'Service ID is required.',
  }),

  client_id: Joi.number().integer().required().messages({
    'number.base': 'Client ID must be a number.',
    'number.integer': 'Client ID must be an integer.',
    'any.required': 'Client ID is required.',
  }),
  message: Joi.string().allow(null, '').max(1000).messages({
    'string.base': 'Message must be text.',
    'string.max': 'Message cannot exceed 1000 characters.',
  }),
})

export const updateBookingSchema = createBookingSchema.fork(
  ['service_id', 'client_id', 'message'],
  (field) => field.optional()
)
