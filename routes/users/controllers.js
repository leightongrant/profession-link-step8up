import { User } from '../../models/user.js'
import bcrypt from 'bcryptjs'
import { seedData } from '../../seeds/seedData.js'
import { userSchema } from '../../schemas/users.js'
import { Profile } from '../../models/profile.js'

// Get all users
export const getAllUsers = async (_, res) => {
  try {
    const result = await User.findAll({
      include: [{ model: Profile }],
      attributes: ['user_id', 'name', 'email', 'role', 'created_at'],
    })
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Get users
export const getOneUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await User.findByPk(id, {
      include: [{ model: Profile }],
      attributes: ['user_id', 'name', 'email', 'role', 'created_at'],
    })
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create user
export const createUser = async (req, res) => {
  try {
    const body = req.body
    const user = await userSchema.validateAsync(body)
    const result = await User.create({
      name: user.name,
      email: user.email,
      password_hash: await bcrypt.hash(user.password, 10),
    })
    return res
      .status(200)
      .json({ name: result.name, email: result.email, role: result.role })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const body = req.body

    const result = await User.findOne({ where: { user_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    const userUpdate = {
      name: body.name,
      email: body.email,
      role: body.role,
    }

    if (body.password) {
      userUpdate.password_hash = await bcrypt.hash(body.password, 10)
    }

    await User.update(userUpdate, {
      where: {
        user_id: id,
      },
    })

    return res.status(200).json({ message: 'User updated' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await User.destroy({ where: { user_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}
