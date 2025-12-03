import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const sanitize = (value) => {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
}

export const createReviewSchema = Joi.object({
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

  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number.',
    'number.integer': 'Rating must be an integer.',
    'number.min': 'Rating must be at least 1.',
    'number.max': 'Rating cannot exceed 5.',
    'any.required': 'Rating is required.',
  }),

  comment: Joi.string().min(10).max(500).required().custom(sanitize).messages({
    'string.base': 'Comment must be text.',
    'string.min': 'Comment should be at least 10 characters long.',
    'string.max': 'Comment cannot exceed 500 characters.',
    'any.required': 'Comment is required.',
  }),
})

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number.',
    'number.integer': 'Rating must be an integer.',
    'number.min': 'Rating must be at least 1.',
    'number.max': 'Rating cannot exceed 5.',
    'any.required': 'Rating is required.',
  }),

  comment: Joi.string().min(10).max(500).required().custom(sanitize).messages({
    'string.base': 'Comment must be text.',
    'string.min': 'Comment should be at least 10 characters long.',
    'string.max': 'Comment cannot exceed 500 characters.',
    'any.required': 'Comment is required.',
  }),
})
