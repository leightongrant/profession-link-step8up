import { Router } from 'express'
import jwt from 'jsonwebtoken'

export const router = Router()

router.post('/verify', (req, res) => {
  const body = req.body

  jwt.verify(body.token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: 'Invalid Token', isValid: false })
    }
    return res.status(200).json(decoded)
  })
})
