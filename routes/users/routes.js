import { Router } from 'express'
import {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  getUsersWithProfiles,
} from './controllers.js'

export const router = Router()

// Get users
router.get('/users', getAllUsers)

// Get users with profiles
router.get('/users-with-profiles', getUsersWithProfiles)

// Get one user
router.get('/users/:id', getOneUser)

// Create user
router.post('/users', createUser)

// Delete user
router.delete('/users/:id', deleteUser)

// Update user
router.put('/users/:id', updateUser)
