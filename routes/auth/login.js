import { Router } from 'express'
import { loginSchema } from '../../schemas/users.js'
import bcrypt from 'bcryptjs'
import { User } from '../../models/user.js'
import jwt from 'jsonwebtoken'

export const router = Router()

router.post('/login', async (req, res) => {
  const body = req.body
  const { error, value } = loginSchema.validate(body)
  if (error) {
    return res.status(400).json({ message: 'Email or password invalid!' })
  }

  try {
    const user = await User.findOne({
      where: { email: value.email },
    })
    if (!user) throw new Error('Email or password invalid!')

    const isValid = await bcrypt.compare(value.password, user.password_hash)
    if (!isValid) throw new Error('Email or password invalid!')

    const payload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    return res.status(200).json(token)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ mesage: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
})
