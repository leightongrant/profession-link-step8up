import { User } from '../../models/user.js'
import bcrypt from 'bcryptjs'
import { createUserSchema, updateUserSchema } from '../../schemas/users.js'
import { Profile } from '../../models/profile.js'
import { Service } from '../../models/service.js'
import { Review } from '../../models/review.js'
import { Booking } from '../../models/booking.js'

// Get All Users
export const getAllUsers = async (_, res) => {
  try {
    const result = await User.findAll({
      include: [
        { model: Profile, include: [{ model: Service, include: [Review] }] },
        { model: Booking },
      ],
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

// Get One User
export const getOneUser = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    const result = await User.findByPk(id, {
      include: [{ model: Profile }],
      attributes: ['user_id', 'name', 'email', 'role', 'created_at'],
    })

    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create User
export const createUser = async (req, res) => {
  try {
    const body = req.body
    const validatedUser = await createUserSchema.validateAsync(body, {
      abortEarly: false,
    })

    const result = await User.create({
      name: validatedUser.name,
      email: validatedUser.email,
      password_hash: await bcrypt.hash(validatedUser.password, 10),
    })

    return res
      .status(201)
      .json({ name: result.name, email: result.email, role: result.role })
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update User
export const updateUser = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    const body = req.body
    const validatedUser = await updateUserSchema.validateAsync(body, {
      abortEarly: false,
    })

    const user = await User.findByPk(id, {
      attributes: ['user_id', 'name', 'email', 'role', 'created_at'],
    })
    if (!user) {
      return res.status(404).json({ message: 'Not found' })
    }

    const userUpdate = {
      name: validatedUser.name,
      email: validatedUser.email,
      role: validatedUser.role,
    }

    if (validatedUser.password) {
      userUpdate.password_hash = await bcrypt.hash(validatedUser.password, 10)
    }

    await user.update(userUpdate)

    return res.status(200).json({ message: 'User updated', user })
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user id' })
    }

    const user = await User.findByPk(id, {
      attributes: ['user_id', 'name', 'email', 'role', 'created_at'],
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()

    return res.status(200).json({ message: 'User deleted', user })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}
