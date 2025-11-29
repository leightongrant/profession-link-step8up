import Joi from 'joi'

export const createUserSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    'string.base': 'Name must be text.',
    'string.empty': 'Please provide your name.',
    'string.max': 'Name cannot exceed 100 characters.',
    'any.required': 'Name is required.',
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
  })

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'))
    .required(),
})
