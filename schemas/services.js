import Joi from 'joi'

export const createServiceSchema = Joi.object({
  profile_id: Joi.number().integer().required().messages({
    'number.base': 'Profile ID must be a number.',
    'number.integer': 'Profile ID must be an integer.',
    'any.required': 'Profile ID is required.',
  }),

  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Title must be text.',
    'string.min': 'Title should be at least 3 characters long.',
    'string.max': 'Title cannot exceed 100 characters.',
    'any.required': 'Title is required.',
  }),

  description: Joi.string().min(10).max(1000).required().messages({
    'string.base': 'Description must be text.',
    'string.min': 'Description should be at least 10 characters long.',
    'string.max': 'Description cannot exceed 1000 characters.',
    'any.required': 'Description is required.',
  }),

  price_range: Joi.string()
    .pattern(/^[£$€]?\d+(\–|-)[£$€]?\d+$/)
    .required()
    .messages({
      'string.base': 'Price range must be text.',
      'string.pattern.base':
        'Price range must be in a valid format (e.g., £200-£500).',
      'any.required': 'Price range is required.',
    }),

  availability: Joi.string().max(100).required().messages({
    'string.base': 'Availability must be text.',
    'string.max': 'Availability cannot exceed 100 characters.',
    'any.required': 'Availability is required.',
  }),
})

export const updateServiceSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Title must be text.',
    'string.min': 'Title should be at least 3 characters long.',
    'string.max': 'Title cannot exceed 100 characters.',
    'any.required': 'Title is required.',
  }),

  description: Joi.string().min(10).max(1000).required().messages({
    'string.base': 'Description must be text.',
    'string.min': 'Description should be at least 10 characters long.',
    'string.max': 'Description cannot exceed 1000 characters.',
    'any.required': 'Description is required.',
  }),

  price_range: Joi.string()
    .pattern(/^[£$€]?\d+(\–|-)[£$€]?\d+$/)
    .required()
    .messages({
      'string.base': 'Price range must be text.',
      'string.pattern.base':
        'Price range must be in a valid format (e.g., £200–£500).',
      'any.required': 'Price range is required.',
    }),

  availability: Joi.string().max(100).required().messages({
    'string.base': 'Availability must be text.',
    'string.max': 'Availability cannot exceed 100 characters.',
    'any.required': 'Availability is required.',
  }),
})
