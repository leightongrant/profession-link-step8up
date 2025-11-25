import User from '../../models/users.js'

export const getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll()
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error)
      return
    }
    res.status(500).json({ message: 'An error has occured' })
  }
}

export const createUser = async (req, res) => {
  await User.sync({ force: true })
  const result = await User.create({
    name: 'Oneal',
    email: 'oneal@example.com',
    password_hash: 'oansdofhodshohfods',
    role: 'admin',
    location: 'Grantham',
  })
  console.log(result)
  res.status(200).json({ message: 'User created' })
}
