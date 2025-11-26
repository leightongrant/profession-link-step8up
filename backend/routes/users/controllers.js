import { User } from '../../models/user.js'
import { seedData } from '../../seeds/seedData.js'

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    //const result = await User.findAll()
    const users = seedData.Users
    res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error)
      return
    }
    res.status(500).json({ message: 'An error has occured' })
  }
}

// Create user
export const createUser = async (req, res) => {
  const result = await User.create({
    name: 'david',
    email: 'david@example.com',
    password_hash: 'oansdofhodshohfods',
    role: 'admin',
    location: 'London',
  })
  console.log(result)
  res.status(200).json({ message: 'User created' })
}
