import jwt from 'jsonwebtoken'

export const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    return next()
  } catch (error) {
    console.error(error)
    return res
      .status(401)
      .json({ message: 'Unauthorized: Token is invalid or expired' })
  }
}
