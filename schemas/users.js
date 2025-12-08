import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const sanitize = (value) => {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
}

export const createUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+ [A-Za-z]+$/)
    .min(3)
    .max(32)
    .required()
    .custom(sanitize)
    .custom((value, helpers) => {
      const [first, last] = value.split(' ')
      if (first.length < 2 || first.length > 30) {
        return helpers.error('any.invalid', {
          message: 'First name must be 2-30 characters long',
        })
      }
      if (last.length < 2 || last.length > 50) {
        return helpers.error('any.invalid', {
          message: 'Last name must be 2-50 characters long',
        })
      }
      return value
    })
    .messages({
      'string.pattern.base':
        'Name must contain only letters with a single space between first and last name',
      'string.empty': 'Name is required',
    }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be text.',
    'string.empty': 'Please provide your email address.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),

  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
    )
    .required()
    .messages({
      'string.empty': 'Please provide a password.',
      'string.pattern.base':
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      'any.required': 'Password is required.',
    }),
})

export const updateUserSchema = createUserSchema
  .fork(['name', 'email', 'password'], (field) => field.optional())
  .append({
    role: Joi.string()
      .valid('client', 'lawyer', 'accountant', 'admin')
      .optional()
      .messages({
        'string.base': 'Role must be text.',
        'any.only': 'Role must be one of: client, lawyer, accountant, admin.',
      }),
    pending_role: Joi.string()
      .allow(null)
      .valid('lawyer', 'accountant')
      .optional()
      .messages({
        'string.base': 'Pending role must be text.',
        'any.only': 'Pending role must be one of: lawyer, accountant, null',
      }),
  })

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
    .required(),
})
