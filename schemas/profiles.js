import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const sanitize = (value) => {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
}

export const profileSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
    'any.required': 'User ID is required.',
  }),

  specialization: Joi.string().max(100).required().custom(sanitize).messages({
    'string.base': 'Specialization must be text.',
    'string.empty': 'Please provide your specialization.',
    'string.max': 'Specialization cannot exceed 100 characters.',
    'any.required': 'Specialization is required.',
  }),

  experience_years: Joi.number().integer().min(0).required().messages({
    'number.base': 'Experience must be a number.',
    'number.integer': 'Experience must be an integer.',
    'number.min': 'Experience years cannot be negative.',
    'any.required': 'Experience years are required.',
  }),

  bio: Joi.string().required().custom(sanitize).messages({
    'string.base': 'Bio must be text.',
    'string.empty': 'Please provide a bio.',
    'any.required': 'Bio is required.',
  }),
  profile_photo_url: Joi.string().uri().allow(null, '').messages({
    'string.base': 'Profile photo URL must be text.',
    'string.uri': 'Profile photo URL must be a valid URI.',
  }),
  location: Joi.string().max(100).allow(null, '').custom(sanitize).messages({
    'string.base': 'Location must be text.',
    'string.max': 'Location cannot exceed 100 characters.',
  }),
})

export const updateProfileSchema = Joi.object({
  specialization: Joi.string().max(100).custom(sanitize).messages({
    'string.base': 'Specialization must be text.',
    'string.max': 'Specialization cannot exceed 100 characters.',
  }),

  experience_years: Joi.number().integer().min(0).messages({
    'number.base': 'Experience must be a number.',
    'number.integer': 'Experience must be an integer.',
    'number.min': 'Experience years cannot be negative.',
  }),

  bio: Joi.string().custom(sanitize).messages({
    'string.base': 'Bio must be text.',
  }),

  rating_avg: Joi.number().min(0).max(5).messages({
    'number.base': 'Rating must be a number.',
    'number.min': 'Rating cannot be less than 0.',
    'number.max': 'Rating cannot be greater than 5.',
  }),

  profile_photo_url: Joi.string().uri().allow(null, '').messages({
    'string.base': 'Profile photo URL must be text.',
    'string.uri': 'Profile photo URL must be a valid URI.',
  }),

  location: Joi.string().max(100).allow(null, '').custom(sanitize).messages({
    'string.base': 'Location must be text.',
    'string.max': 'Location cannot exceed 100 characters.',
  }),
}).min(1)
